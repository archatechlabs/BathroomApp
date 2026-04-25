#!/usr/bin/env node
/* Saves expo-go-qr.png for Expo Go. Usage: METRO_PORT=8082 node scripts/make-qr.js */
const QR = require('qrcode');
const { execSync } = require('child_process');
const path = require('path');

const port = process.env.METRO_PORT || process.argv[2] || '8081';

function getLanIp() {
  try {
    return execSync('ipconfig getifaddr en0 || ipconfig getifaddr en1', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

const ip = getLanIp();
if (!ip) {
  console.error('Could not detect LAN IP. Set METRO_HOST=192.168.x.x');
  process.exit(1);
}

const url = `exp://${ip}:${port}`;
const out = path.join(__dirname, '..', 'expo-go-qr.png');

QR.toFile(out, url, { width: 512 }, (err) => {
  if (err) throw err;
  console.log('Wrote', out);
  console.log(url);
});
