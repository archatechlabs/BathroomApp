/**
 * CocoaPods references expo-constants under node_modules/expo/node_modules/expo-constants
 * (nested install). npm often hoists to node_modules/expo-constants only — add a symlink
 * so PrivacyInfo.xcprivacy resolves for EXConstants-ExpoConstants_privacy.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const hoisted = path.join(root, 'node_modules', 'expo-constants');
const nestedDir = path.join(root, 'node_modules', 'expo', 'node_modules');
const nestedLink = path.join(nestedDir, 'expo-constants');

function main() {
  if (!fs.existsSync(hoisted)) return;
  if (fs.existsSync(nestedLink)) {
    const stat = fs.lstatSync(nestedLink);
    if (stat.isSymbolicLink() || stat.isDirectory()) return;
  }
  fs.mkdirSync(nestedDir, { recursive: true });
  const rel = path.relative(nestedDir, hoisted);
  try {
    fs.symlinkSync(rel, nestedLink, 'dir');
    console.log('[postinstall] Linked expo/node_modules/expo-constants ->', rel);
  } catch (e) {
    if (e && e.code === 'EEXIST') return;
    console.warn('[postinstall] Could not symlink expo-constants:', e.message);
  }
}

main();
