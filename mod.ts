/**
 * Usage:
 *   deno install -f --allow-run --allow-env --allow-read --allow-write dnx https://raw.githubusercontent.com/axetroy/deno_dnx/master/mod.ts
 *   dnx run --allow-read https://deno.land/std/examples/cat.ts README.md
 */

import { join } from "https://deno.land/std@v0.41.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@v0.41.0/fs/ensure_dir.ts";
import { signal } from "https://deno.land/std@v0.41.0/signal/mod.ts";
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
  cmd: [execPath(), "run"].concat(args),
  env: {
    ...env(),
    DENO_DIR: tempDir,
  },
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const disposable = signal(
  Deno.Signal.SIGUSR1,
  Deno.Signal.SIGUSR2,
  Deno.Signal.SIGINT,
);

(async () => {
  for await (const _ of disposable) {
    removeSync(tempDir, { recursive: true });
    ps.kill(1);
    exit(1);
  }
});

const status = await ps.status();

removeSync(tempDir, { recursive: true });

disposable.dispose();

exit(status.code);
