import * as dotenv from 'dotenv';
import * as cp from 'child_process';
dotenv.config();

let EXECUTION_TYPE: string = "LOCAL";
const EXECUTION_TYPE_ENV = process.env.EXECUTION_TYPE;
if (EXECUTION_TYPE_ENV) {
    if (EXECUTION_TYPE_ENV.toUpperCase() === "BROWSERSTACK") {
        EXECUTION_TYPE = "BROWSERSTACK";
    } else if (EXECUTION_TYPE_ENV.toUpperCase() === "LOCAL") {
        EXECUTION_TYPE = "LOCAL";
    } else {
        throw new Error(`Unknown EXECUTION_TYPE: \`${EXECUTION_TYPE_ENV}\``);
    }
}

let EXECUTION_HEADLESS: boolean = true;
const EXECUTION_HEADLESS_ENV = process.env.EXECUTION_HEADLESS;
if (EXECUTION_HEADLESS_ENV) {
    if (EXECUTION_HEADLESS_ENV.toUpperCase() === "TRUE") {
        EXECUTION_HEADLESS = true;
    } else if (EXECUTION_HEADLESS_ENV.toUpperCase() === "FALSE") {
        EXECUTION_HEADLESS = false;
    } else {
        throw new Error(`Unknown EXECUTION_HEADLESS: \`${EXECUTION_HEADLESS_ENV}\``);
    }
}

const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
console.log(`Playwright version: \`${clientPlaywrightVersion}\``);

const BROWSERSTACK_CAPS = {
    'browser': process.env.BROWSERSTACK_USER_BROWSER_TYPE || 'chrome',  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': process.env.BROWSERSTACK_USER_OS || 'osx',
    'os_version': process.env.BROWSERSTACK_USER_OS_VERSION || 'catalina',
    'name': process.env.BROWSERSTACK_USER_NAME || 'My first playwright test',
    'build': process.env.BROWSERSTACK_USER_BUILD || 'playwright-build-1',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    'client.playwrightVersion': clientPlaywrightVersion  // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
};

let PREMIER_LEAGUE_TEAM_EXPECTED_POSITION: number;
const a = process.env.PREMIER_LEAGUE_TEAM_EXPECTED_POSITION;
if (a) {
    try {
        PREMIER_LEAGUE_TEAM_EXPECTED_POSITION = parseInt(a);
    } catch (error) {
        throw new Error(`Failed parsing int for: ${a}` + 
        ` - Error:\n${error.message}`);
    }
}

let PREMIER_LEAGUE_TEAM_EXPECTED_POINTS: number;
const b = process.env.PREMIER_LEAGUE_TEAM_EXPECTED_POINTS;
if (b) {
    try {
        PREMIER_LEAGUE_TEAM_EXPECTED_POINTS = parseInt(b);
    } catch (error) {
        throw new Error(`Failed parsing int for: ${b}` + 
            ` - Error:\n${error.message}`);
    }
}

const ENV_VARS = {
    EXECUTION_TYPE,
    EXECUTION_HEADLESS,
    BROWSERSTACK_CAPS,
    PREMIER_LEAGUE_TEAM_NAME: process.env.PREMIER_LEAGUE_TEAM,
    PREMIER_LEAGUE_TEAM_EXPECTED_POSITION,
    PREMIER_LEAGUE_TEAM_EXPECTED_POINTS,
}

export { ENV_VARS };