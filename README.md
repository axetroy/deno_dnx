[![Build Status](https://github.com/axetroy/deno_dnx/workflows/test/badge.svg)](https://github.com/axetroy/deno_dnx/actions)

### dnx

A cli tool is used to run the deno command to delete the generated files when the process exits

require: Deno v0.41.0

### Install

```shell
deno install dnx https://raw.githubusercontent.com/axetroy/deno_dnx/master/mod.ts --allow-run --allow-env --allow-read --allow-write
```

### Usage

```shell
dnx run --allow-read https://deno.land/std/examples/cat.ts README.md
```

## License

The [MIT License](LICENSE)
