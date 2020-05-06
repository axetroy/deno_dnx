[![Build Status](https://github.com/axetroy/deno_dnx/workflows/test/badge.svg)](https://github.com/axetroy/deno_dnx/actions)

### dnx

A cli tool is used to run the deno command to delete the generated files when the process exits

require: Deno v1.0.0-rc1

### Install

```shell
$ deno install -f --unstable --allow-run --allow-env --allow-read --allow-write https://raw.githubusercontent.com/axetroy/deno_dnx/master/dnx.ts
```

### Usage

```shell
$ dnx run --allow-read https://deno.land/std@v1.0.0-rc1/examples/cat.ts README.md
$ dnx run --allow-net --allow-read https://deno.land/std@v1.0.0-rc1/http/file_server.ts
```

## License

The [MIT License](LICENSE)
