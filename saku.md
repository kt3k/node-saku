# test
> Runs unit tests

    npx kocha --require src/__tests__/helper src{/,/**/}__tests__/*.js

# lint
> Runs lint checks

    npx standard

# fix
> Runs auto fixer of lint tool

    npx standard --fix

# cov
> Makes coverage reports

    npx nyc --reporter=text-summary --reporter=lcov saku test

# codecov
> Posts reports to codecov.io

    saku cov
    npx codecov
