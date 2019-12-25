import { runIfMain, test } from "https://deno.land/std@v0.27.0/testing/mod.ts";
const { run, execPath } = Deno;

test(async function testGetProcess() {
  const ps = await run({
    stdout: "piped",
    args: [
      execPath(),
      "run",
      "--allow-env",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      "./mod.ts",
      "--version"
    ]
  });

  const output = new TextDecoder().decode(await ps.output());

  console.log(output);
});

runIfMain(import.meta);
