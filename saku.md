# test
> Runs unit tests

npm run test

# lint
> Runs lint checks

npx standard

# fix
> Runs auto fixer of lint tool

npx standard --fix

# cov
> Makes coverage reports

npx nyc --reporter=text-summary --reporter=lcov npm test
