import { test, expect, chromium, Browser } from '@playwright/test';
import { SportPage } from '../pages/Sport';
import { PremierLeagueUtil } from '../utils/PremierLeague';
import { PremierLeagueTableTeamStats, PremierLeagueTeamName } from '../types/Sport';
import { ENV_VARS } from '../env';

const { PREMIER_LEAGUE_TEAM_NAME,
    PREMIER_LEAGUE_TEAM_EXPECTED_POINTS,
    PREMIER_LEAGUE_TEAM_EXPECTED_POSITION } = ENV_VARS;

PremierLeagueUtil.validateTeamEnvVar(PREMIER_LEAGUE_TEAM_NAME as string);

let browser: Browser;
let sportPage: SportPage;

test.setTimeout(1000*60*60*30);

test('Sport Page', async () => {
    browser = await chromium.launch({ headless: false });
    sportPage = new SportPage(browser);
    await sportPage.initialiseSportPage();
    const premierLeagueTeamStats: PremierLeagueTableTeamStats = 
        await SportPage.getPremierLeagueTeamStats(
            sportPage,
            PREMIER_LEAGUE_TEAM_NAME as PremierLeagueTeamName
        );
    console.log(`Premier League Team Stats:\n${JSON.stringify(premierLeagueTeamStats, null, 2)}`);
    if (PREMIER_LEAGUE_TEAM_EXPECTED_POINTS) {
        expect(premierLeagueTeamStats.position).toStrictEqual(PREMIER_LEAGUE_TEAM_EXPECTED_POINTS);
    }
    if (PREMIER_LEAGUE_TEAM_EXPECTED_POSITION) {
        expect(premierLeagueTeamStats.points).toStrictEqual(PREMIER_LEAGUE_TEAM_EXPECTED_POSITION);
    }
});

test.afterAll('Cleanup', async () => {
    await sportPage.closeContext();
    await sportPage.closeBrowser();
});
