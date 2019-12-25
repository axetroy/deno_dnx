/**
 * Usage:
 *   deno install dnx https://deno.land/std/examples/dnx.ts --allow-env --allow-read --allow-write --allow-run
 *   dnx run --allow-read https://deno.land/std/examples/cat.ts README.md
 */

import { join } from "https://deno.land/std@v0.27.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@v0.27.0/fs/ensure_dir.ts";
const {
  run,
  execPath,
  env,
  cwd,
  args,
  exit,
  makeTempDirSync,
  removeSync,
  dir
} = Deno;

// TODO: handle signal

const dnxCacheDir = join(dir("cache"), "dnx");

await ensureDir(dnxCacheDir);

const tempDir = makeTempDirSync({
  dir: dnxCacheDir
});

const ps = run({
  cwd: cwd(),
  args: [execPath()].concat(args.slice(1)),
  env: {
    ...env(),
    DENO_DIR: tempDir
  },
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit"
});

const status = await ps.status();

removeSync(tempDir, { recursive: true });

exit(status.code);
