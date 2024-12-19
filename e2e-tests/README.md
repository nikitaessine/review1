# Running E2E tests

1. Install NPM packages: `npm ci`. If you do not have Playwright browsers installed, also run: `npx playwright install --with-deps`.
2. Build and run the docker image (there are changes to the docker-compose): `docker-compose up --build`. Make sure you have Docker running before running this command. Wait for the containers to start up before running the tests.
3. Run Playwright: `npx playwright test`

# Running the GitHub action
1. Add your github repo as a remote by: `git remote add github URL`. Do `git init` if you get an error of not being inside a git repo.
2. Create new branch: `git checkout -b action-test`.
3. Rename the `github` folder to `.github`.
4. Add changes and commit: `git add --all && git commit -m "Test actions"`.Push changes to new branch: `git push -u github action-test`.
5. Go to the github page of your remote repo. Select "Actions" from the tabs. There should be a new action, that you can trigger manually trough the UI. Do that.