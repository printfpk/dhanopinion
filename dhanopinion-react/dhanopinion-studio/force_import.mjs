import { spawn } from 'child_process';

const child = spawn('npx.cmd', ['sanity', 'dataset', 'import', 'import.ndjson', 'production', '--replace'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true
});

child.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  if (output.toLowerCase().includes('overwrite') || output.toLowerCase().includes('replace')) {
    child.stdin.write('Y\n');
  }
});

child.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
  if (data.toString().toLowerCase().includes('overwrite') || data.toString().toLowerCase().includes('replace')) {
    child.stdin.write('Y\n');
  }
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
