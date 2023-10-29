import { Browser, chromium } from '@playwright/test';
import { VideoPageUtil } from '../utils/VideoPageUtil';
import { SportPage } from '../pages/Sport';
import { PremierLeagueTableTeamStats, PremierLeagueTeamName } from '../types/Sport';
import { VideoPage } from '../pages/Video';
import { afterAll, beforeAll, binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
export class SportSteps {

    browser: Browser;
    videoPage: VideoPage;
    premierLeagueTeamStats: PremierLeagueTableTeamStats;

    @beforeAll()
    async function () {
        this.browser = await chromium.launch({ headless: false });
    };

    @given('I am on the Daily Mail Video Page')
    public async givenIAmOnTheDailyMailVideoPage() {
        this.videoPage = await VideoPageUtil.mainVideoSetup(this.browser);
    }

    @when('I click on the Sport Menu')
    public async whenIClickOnTheSportMenu() {
        await this.videoPage.selectSportPage();
    }

    @when(/I retrieve the position and points for \$(\d*)/)
    public async whenIRetrieveThePositionAndPointsForTeam(team: string) {
        this.premierLeagueTeamStats = await SportPage.getPremierLeagueTeamStats(
            this.videoPage,
            team as PremierLeagueTeamName
        );
    }

    @then(/the position of that team should be \$(\d*)/)
    public async thenThePositionOfThatTeamShouldBe(expectedPosition: string) {
        assert.equal(this.premierLeagueTeamStats.position.toString(),expectedPosition);
    }

    @then(/the points of that team should be \$(\d*)/)
    public async thenThePointsOfThatTeamShouldBe(expectedPoints: string) {
        assert.equal(this.premierLeagueTeamStats.points.toString(),expectedPoints);
    }

    @afterAll()
    public async cleanup() {
        await this.browser.close();
    }

}