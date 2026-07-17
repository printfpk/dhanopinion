// Debug script to trace which oclif plugin is hanging
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

console.log('[DEBUG] Starting sanity dev with FULL debug tracing...');

const cliBin = resolve(
  'node_modules/.pnpm/@sanity+cli@7.7.1_@babel+co_4d532db79d7d0db12971de0a91c836af/node_modules/@sanity/cli/bin/run.js'
);

const child = spawn(process.execPath, [cliBin, 'dev'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: process.cwd(),
  env: {
    ...process.env,
    DEBUG: '*'
  }
});

let lastLine = '';
let lineCount = 0;

function handleData(prefix, data) {
  const lines = data.toString().split('\n');
  for (const line of lines) {
    if (line.trim()) {
      lineCount++;
      lastLine = line.trim();
      // Print first 100 lines, then only lines with key words
      if (lineCount <= 150 || /plugin|error|fail|hang|load|dev|vite|server|listen|port/i.test(line)) {
        console.log(`[${prefix}:${lineCount}]`, line.trim().substring(0, 300));
      }
    }
  }
}

child.stdout.on('data', (data) => handleData('OUT', data));
child.stderr.on('data', (data) => handleData('ERR', data));

child.on('error', (err) => console.error('[DEBUG] Spawn error:', err));
child.on('close', (code) => {
  console.log('[DEBUG] Child exited with code:', code);
  console.log('[DEBUG] Total lines:', lineCount);
  console.log('[DEBUG] Last line:', lastLine);
});

// Kill after 30 seconds
setTimeout(() => {
  console.log('[DEBUG] === TIMEOUT after 30s ===');
  console.log('[DEBUG] Total lines received:', lineCount);
  console.log('[DEBUG] Last line was:', lastLine);
  child.kill('SIGTERM');
}, 30000);
