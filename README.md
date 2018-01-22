# saku (作) v0.1.0

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

# `saku.md` Rules

- Heading (# title) starts the task definition.
- Paragraphs are commands.
  - Paragraphs can have multiple commands. They will be executed sequentially.
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

The above defines the task `build`, which has description `Build the go binary.`. It has two commands `echo Starting build go binary` and `go build -v -i main.go` and they runs in sequence.

## Parallel execution

`saku` command has `-p, --parallel` option. You can run task in parallel like the below:

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

If you need to invoke tasks in paralle l from another task, use saku command with `-p` option.

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
saku@0.1.0

Usage: saku [options] <task, ...>

Options:
  -v, --version       Shows the version number and exits.
  -h, --help          Shows the help message and exits.
  -i, --info          Shows the task information and exits.
  -p, --parallel      Runs tasks in parallel. Default false.
  -s, --serial        Runs tasks in serial. Default true.
  --cwd <path>        Sets the current directory.
```

# Notes

## Why not just use run-script?

If your project is JavaScript project and it has `package.json`, then run-script is probably enough for your use case. The main target of `saku` is non-javascript project where no good task runner is available.

## The origin of the name

Saku is the Japanese name for the Chinese character "作", which means "make". Saku is intended to be an alternative of `make` command (of a task runner use case).

# License

MIT
