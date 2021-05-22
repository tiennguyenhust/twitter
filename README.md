# twitter
A decentralised light - Twitter

1. docker-compose is set up for deployment, test and migration
  - deployment: docker-compose.deploy.yaml and deploy.Dockerfile
  - test: docker-compose.test.yaml and test.Dockerfile
  - migrate: docker-compose.migrate.yaml and migrate.Dockerfile

2. How to run: all are configured in package.json scripts
  - deployment: npm run docker:deploy
  - test: npm run docker:test
  - migrate: npm run docker:migrate
