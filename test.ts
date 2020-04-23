const { test, run, execPath } = Deno;

test(async function testGetProcess() {
  const ps = run({
    stdout: "piped",
    cmd: [
      execPath(),
      "run",
      "--allow-env",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      "./mod.ts",
      "--version",
    ],
  });

  const output = new TextDecoder().decode(await ps.output());

  console.log(output);
});
