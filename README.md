# saku (作) v0.10.1

[![CircleCI](https://circleci.com/gh/kt3k/saku.svg?style=svg)](https://circleci.com/gh/kt3k/saku)
[![Greenkeeper badge](https://badges.greenkeeper.io/kt3k/saku.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/kt3k/saku/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/saku)

> Markdown-based task runner

requires `node` >= 8.x.

`saku` is a simple task runner based on markdown syntax. You can define and describe your tasks in markdown file `saku.md` and execute them with `saku` command.

# :cd: Install

Via npm:

    npm i -g saku

# Usage

First, create a markdown file `saku.md`:

```md
# build
> Build the go binary.

    go build -v -i main.go

# test
> Run all the go tests.

    go test -race ./...

# js

    minify -o public/script.js src/js

# css

    minify -o public/style.css src/css
```

The above defines 4 tasks `build` `test` `js` `css`. (A heading (#) is a task title!)

If you hit the command `saku build`, it invokes `build` task, `go build -v -i main.go` in the above example.

If you hit `saku --info` it shows the list of the descriptions of the all tasks.

**Note**: 4-space or tab indent makes code block in markdown syntax. See [here](https://daringfireball.net/projects/markdown/syntax#precode)

```md
    echo hello
    echo world
```

The above is a code block of `echo hello` for the first line and `echo world` for the second line.

# `saku.md` Rules

- Heading (# title) starts the task definition.
- Code blocks are commands.
  - Code blocks can have multiple commands. They will be executed sequentially.
- Blockquotes are description of the task.
- Anything else is ignored.
- Anything before the first heading is ignored.

For example:

```
# build
> Build the go binary.

    echo Starting build go binary
    go build -v -i main.go
```

The above defines the task `build`, which has the description `Build the go binary.`. It has two commands `echo Starting build go binary` and `go build -v -i main.go` and they run in sequence.

## Parallel execution

`saku` command has `-p, --parallel` option. You can run tasks in parallel like the below:

```
saku -p watch-js run-server
```

## Use `saku` in `saku.md`

If you need to invoke tasks from another task, use saku command in saku.md.

```md
# js

    browserify src/main.js > build/app.js

# minify

    uglify-js < build/app.js > build/app.min.js

# dist

    saku -s js minify
```

If you need to invoke tasks in parallel from another task, use `saku -p`.

```md
# watch

    my-watcher

# serve

    my-server

# start

    saku -p serve watch
```

# CLI Usage

```
Usage: saku [options] <task, ...>

Options:
  -v, --version   - - - Shows the version number and exits.
  -h, --help  - - - - - Shows the help message and exits.
  -i, --info  - - - - - Shows the task information and exits.
  -p, --parallel  - - - Runs tasks in parallel. Default false.
  -s, --sequential  - - Runs tasks in serial. Default true.
  -c, --config <path> - Specifies the config file. Default is 'saku.md'.
  -r, --race  - - - - - Set the flag to kill all tasks when a task
                        finished with zero. This option is valid only
                        with 'parallel' option.
  -q, --quiet   - - - - Stops the logging.
```

# Notes

## Why not just use run-script?

If your project is JavaScript project and it has `package.json`, then run-script is probably enough for your use case. The main target of `saku` is non-javascript project where no good task runner is available.

## The origin of the name

Saku is the Japanese name for the Chinese character "作", which means "make". Saku is intended to be an alternative of `make` command (of a task runner use case).

# Prior Art

- [make][]
- [npm-run-all][] by @mysticatea
- yaml-based tools
  - [robo][]
  - [go-task][]

# License

MIT

[make]: https://en.wikipedia.org/wiki/Make_(software)
[npm-run-all]: https://github.com/mysticatea/npm-run-all
[robo]: https://github.com/tj/robo
[go-task]: https://github.com/go-task/task
