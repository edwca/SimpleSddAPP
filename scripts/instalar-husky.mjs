import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (!existsSync('.git')) {
  process.exit(0);
}

execFileSync('npx', ['husky'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
