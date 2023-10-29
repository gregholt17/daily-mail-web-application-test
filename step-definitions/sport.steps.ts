import { Browser, chromium, expect } from '@playwright/test';
import { VideoPageUtil } from '../utils/VideoPageUtil';
import { SportPage } from '../pages/Sport';
import { PremierLeagueTableTeamStats, PremierLeagueTeamName } from '../types/Sport';
import { VideoPage } from '../pages/Video';
import { AfterAll, BeforeAll, Given, Then, When } from '@cucumber/cucumber';

let browser: Browser;
let videoPage: VideoPage;
let premierLeagueTeamStats: PremierLeagueTableTeamStats;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Given('I am on the Daily Mail Video Page', async function () {
    videoPage = await VideoPageUtil.mainVideoSetup(this.browser);
});

When('I click on the Sport Menu', async function () {
    await videoPage.selectSportPage();
});

When('I retrieve the position and points for {team}', async function (team: string) {
    premierLeagueTeamStats = await SportPage.getPremierLeagueTeamStats(
        this.videoPage,
        team as PremierLeagueTeamName
    );
});

Then('the position of that team should be {expectedPosition}', async function(expectedPosition: string) {
    expect(premierLeagueTeamStats.position.toString()).toStrictEqual(expectedPosition);
})

Then('the points of that team should be {expectedPoints}', async function(expectedPoints: string) {
    expect(premierLeagueTeamStats.points.toString()).toStrictEqual(expectedPoints);
})

AfterAll(async function() {
    await this.browser.close();
});