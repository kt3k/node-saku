# test
> Runs unit tests

    npx kocha src{/,/**/}__tests__/*.js

# lint
> Runs lint checks

    npx standard

# fix
> Runs auto fixer of lint tool

    npx standard --fix

# cov
> Makes coverage reports

    npx nyc --reporter=text-summary --reporter=lcov saku test
