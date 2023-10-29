## 1. Git Clone
`git clone git@github.com:gregholt17/daily-mail-web-application-test.git`

## 2. Node version 18
`nvm use 18`

## 3. NPM Install
`npm install`
opt to install Playwright browsers if asked. Otherwise run:
`npx playwright install-deps`

## 4. Create Environment Variable .env File
Configure .env file for Environment Variables:
`PREMIER_LEAGUE_TEAM` - For the sport test enter one of: "Tottenham" | "Man City" | "Arsenal" | "Liverpool" |
    "Aston Villa" | "Newcastle" | "Brighton" | "Man Utd" | "West Ham" | 
    "Chelsea" | "Crystal Palace" | "Wolves" | "Fulham" | "Brentford" | "Nottm Forest"
    | "Everton" | "Luton" | "Burnley" | "Bournemouth" | "Sheff Utd"
`PREMIER_LEAGUE_TEAM_EXPECTED_POSITION` - If defined an assertion is performed against the chosen teams position.
`PREMIER_LEAGUE_TEAM_EXPECTED_POINTS` - If defined an assertion is performed against the chosen teams points.

## 5. Run Playwright Scripts
```npm run video```
Runs tests for the Daily Mail Video Page as per the tech test.
I receive an error after performing any actions on the video - error.png provided in the root of this repo.
I assume this is down to checks which make sure that automated browsers + bots don't cause false advertiser statistics etc.
I have therefore split up the requested steps into separate test cases.
It did also limit me somewhat in what assertions I could perform after actions to validate that that step was successful, valid.

```npm run sport```
Runs tests for the Daily Mail Sport Page as per the tech test.
I have provided environment variable setup as highlighted above.
There is validation to make sure that the team you specify is valid.
The statistics for that team are automatically printed, no matter what Env Vars are specified (provided the validation is met for the team name)
As per above, if environment variables are specified for the position of that team and/or the points - then assertions are made for such.

## Note
- In a real world scenario I would add .env to the .gitignore but have left it in for simplicity.
- I have not run Cucumber specifically with Playwright/Typescript before. I have tried to do so here and seem to have got it mostly set up but then the step definitions are said to be undefined when I try to run cucumber. It looks like perhaps a versioning issue between different libraries.