# Twitter
A decentralised light - Twitter

1. docker-compose is set up for deployment, test, coverage and migration
    - deployment: docker-compose.deploy.yaml and deploy.Dockerfile
    - test: docker-compose.test.yaml and test.Dockerfile
    - migrate: docker-compose.migrate.yaml and migrate.Dockerfile
    - coverage: docker-compose.coverage.yaml and coverage.Dockerfile

2. Initialize application
    - download repository: git clone git@github.com:tiennguyenhust/twitter.git
    - move to the twitter directory: cd twitter
    - checkout master: git checkout master
    - install package: npm install

3. Run: all are configured in package.json scripts
    - deployment: npm run docker:deploy
    - test: npm run docker:test
    - migrate: npm run docker:migrate
    - check test coverage: npm run docker:coverage

4. Start Application:
    - npm run frontend:start

