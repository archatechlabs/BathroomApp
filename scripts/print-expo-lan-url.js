#!/usr/bin/env node
/**
 * Prints exp:// URL for the current machine. Pass Metro port: node scripts/print-expo-lan-url.js 8082
 */
const { execSync } = require('child_process');

const port = process.argv[2] || process.env.EXPO_METRO_PORT || '8081';

function getLanIp() {
  try {
    const out = execSync('ipconfig getifaddr en0 || ipconfig getifaddr en1', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out;
  } catch {
    /* ignore */
  }
  return 'YOUR_MAC_LAN_IP';
}

const ip = getLanIp();
console.log(`exp://${ip}:${port}`);
