import {
  assert,
} from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";

const { test, run, execPath, readAll } = Deno;

test({
  name: "run mod.ts",
  fn: async () => {
    const ps = run({
      stdout: "piped",
      cmd: [
        execPath(),
        "run",
        "--unstable",
        "--allow-env",
        "--allow-read",
        "--allow-write",
        "--allow-run",
        "./mod.ts",
        "--version",
      ],
    });

    const output = new TextDecoder().decode(await readAll(ps.stdout!));

    assert(output.length > 0);

    ps.stdout?.close();

    ps.close();
  },
});
