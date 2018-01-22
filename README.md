# saku v0.1.0

> Markdown-based task runner

requires `node` >= 8.x.

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

Then hit command `saku build`. It invokes the commands in `build` section of `saku.md`.

# CLI Usage

# Notes

## Why not just use run-script?

If your project is JavaScript project and it has `package.json`, then run-script is probably enough for your case. The main target of `saku` is non-javascript project where no good task runner is available.

## The origin of the name

Saku is the Japanese name for the Chinese character "作", which means "make". Saku is intended to be an alternative of `make` command (as a task runner).

# License

MIT
