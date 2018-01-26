# hello
> Says Hello
> And exits

    echo hello

# world
> Says world
> And exits

    echo world

# parallel
> Says Hello in parallel
> And exits

    node ../bin/saku.js -p hello world

# serial
> Says Hello in series
> And exits

    node ../bin/saku.js -s hello world

# test

# ls
> List the files

    ls

# pwd
> Show the present working directory

    pwd

# sleep-1-then-foo
> Sleeps 1 second, then says foo

    sleep 1
    echo foo

# sleep-2-then-bar
> Sleeps 2 seconds, then says bar

    sleep 2
    echo bar

# spawn-sleep-2-then-baz
> Spawns sleep 2 process, then says bar

    sh -c "sleep 2"
    echo baz
