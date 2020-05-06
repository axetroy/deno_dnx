[![Build Status](https://github.com/axetroy/deno_dnx/workflows/test/badge.svg)](https://github.com/axetroy/deno_dnx/actions)

### dnx

A cli tool is used to run the deno command to delete the generated files when the process exits

require: Deno v1.0.0-rc1

### Install

```shell
deno install -f --allow-run --allow-env --allow-read --allow-write dnx https://raw.githubusercontent.com/axetroy/deno_dnx/master/mod.ts
```

### Usage

```shell
dnx run --allow-read https://deno.land/std/examples/cat.ts README.md
```

## License

The [MIT License](LICENSE)
