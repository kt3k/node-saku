const { describe, it } = require('kocha')
const { Task } = require('../')
const factory = new Task.Factory()
const assert = require('assert')

describe('TaskFactory', () => {
  describe('createFromMarkdown', () => {
    it('creates TaskCollection from markdown text', () => {
      const tasks = factory.createFromMarkdown(`
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
`)

      assert(tasks instanceof Task.Collection)
      assert.strictEqual(tasks.length, 4)
      assert(tasks.tasks[0] instanceof Task)
      console.log(JSON.stringify(tasks, null, 2))
    })
  })
})
