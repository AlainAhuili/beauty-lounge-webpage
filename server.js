// YehMee Beauty Lounge: starts the website and the booking module (booking/) together.

import express from 'express';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 8000;
const BOOKING_PORT = Number(process.env.BOOKING_PORT) || 3000; // buchen.html links here
const watch = process.argv.includes('--watch');
const root = (path) => fileURLToPath(new URL(path, import.meta.url));

if (!existsSync(root('./booking/node_modules'))) {
  console.error('The booking module is not installed yet. Run: npm run setup');
  process.exit(1);
}

// The booking app runs as its own process, with its own data in booking/data
const booking = spawn(process.execPath, [...(watch ? ['--watch'] : []), 'server.js'], {
  cwd: root('./booking'),
  env: { ...process.env, PORT: String(BOOKING_PORT) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
const prefix = (stream, out) => stream.on('data', (chunk) => {
  for (const line of chunk.toString().trimEnd().split('\n')) out.write(`[booking] ${line}\n`);
});
prefix(booking.stdout, process.stdout);
prefix(booking.stderr, process.stderr);

// If the booking app stops, stop the website too, so nothing runs half-broken
booking.on('exit', (code) => {
  console.error(`[booking] stopped (exit code ${code})`);
  process.exit(code || 1);
});

// The website: pages and photos from public/. "/buchen" also works without ".html".
const site = express();
site.disable('x-powered-by');
site.use(express.static(root('./public'), { extensions: ['html'] }));

const server = site.listen(PORT, () => {
  console.log(`[website] YehMee website running at http://localhost:${PORT}`);
  console.log(`[website] Booking module at http://localhost:${BOOKING_PORT}`);
});

// Ctrl+C stops both
const stop = () => {
  booking.removeAllListeners('exit');
  booking.kill();
  server.close(() => process.exit(0));
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
