/**
 * Usage:
 *   deno install -f --allow-run --allow-env --allow-read --allow-write dnx https://raw.githubusercontent.com/axetroy/deno_dnx/master/mod.ts
 *   dnx run --allow-read https://deno.land/std/examples/cat.ts README.md
 */

import { join } from "https://deno.land/std@v1.0.0-rc1/path/mod.ts";
import { ensureDir } from "https://deno.land/std@v1.0.0-rc1/fs/ensure_dir.ts";
import {
  signal,
  Disposable,
} from "https://deno.land/std@v1.0.0-rc1/signal/mod.ts";
const {
  run,
  execPath,
  env,
  cwd,
  args,
  exit,
  makeTempDirSync,
  removeSync,
  dir,
} = Deno;

const dnxCacheDir = join(dir("cache") as string, "dnx");

await ensureDir(dnxCacheDir);

const tempDir = makeTempDirSync({
  dir: dnxCacheDir,
});

const ps = run({
  cwd: cwd(),
  cmd: [execPath()].concat(args),
  env: {
    ...env.toObject(),
    DENO_DIR: tempDir,
  },
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const signalListener = signal(
  Deno.Signal.SIGUSR1,
  Deno.Signal.SIGUSR2,
  Deno.Signal.SIGINT,
);

const disposables: Disposable[] = [
  signalListener,
  {
    dispose: () => {
      ps.stdin?.close();
      ps.stdout?.close();
      ps.stderr?.close();
      ps.close();
    },
  },
];

(async () => {
  for await (const _ of signalListener) {
    removeSync(tempDir, { recursive: true });
    ps.kill(1);
    exit(1);
  }
});

const status = await ps.status();

for (const entry of disposables) {
  entry.dispose();
}

removeSync(tempDir, { recursive: true });

exit(status.code);
