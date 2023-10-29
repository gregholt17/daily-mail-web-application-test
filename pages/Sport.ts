import { Browser, ElementHandle, Locator } from "@playwright/test";
import { VideoPage } from "./Video";
import { PremierLeagueTable, PremierLeagueTableTeamStats,
    PremierLeagueTeamName } from "../types/Sport";

class SportPage extends VideoPage {

    constructor(browser: Browser) {
        super(browser);
    }

    async initialiseSportPage(): Promise<void> {
        await this.initialiseVideoPage();
        await this.selectSportPage();
    }

    static async getPremierLeagueTable(
        page: SportPage | VideoPage
    ): Promise<PremierLeagueTable> {
        await page.waitForPageLoad();
        const premierLeagueTableLocator = page.page.locator('div[class^="competitionTable"]');
        const EHS: ElementHandle[] = await premierLeagueTableLocator.elementHandles();
        if (EHS.length === 0) {
            throw new Error(`Error finding premier league table div.`);
        }
        else if (EHS.length > 1) {
            throw new Error(`Error finding premier league table div - 2+ elements`);
        }
        const trLocator: Locator = premierLeagueTableLocator.locator('tbody').locator('tr');
        const trElementHandles: ElementHandle[] = await trLocator.elementHandles();
        let premierLeagueTable: any[] = [];
        for (const trElementHandle of trElementHandles) {
            const positionElement = await trElementHandle.waitForSelector('xpath=./td[1]');
            const positionStr: string = await positionElement.innerText();
            const position: number = parseInt(positionStr);
            const teamNameElement = await trElementHandle.waitForSelector('xpath=./td[4]');
            const teamName: string = await teamNameElement.innerText();
            const gamesPlayedElement = await trElementHandle.waitForSelector('xpath=./td[5]');
            const gamesPlayedStr: string = await gamesPlayedElement.innerText();
            const gamesPlayed: number = parseInt(gamesPlayedStr);
            const pointsElement = await trElementHandle.waitForSelector('xpath=./td[6]');
            const pointsStr = await pointsElement.innerText();
            const points: number = parseInt(pointsStr);
            premierLeagueTable.push({ position, teamName, gamesPlayed, points });
        }
        return premierLeagueTable;
    }

    static async getPremierLeagueTeamStats(
        page: SportPage | VideoPage,
        teamName: PremierLeagueTeamName
    ): Promise<PremierLeagueTableTeamStats> {
        const premierLeagueTable: PremierLeagueTable = await SportPage.getPremierLeagueTable(page);
        for (const premierLeagueTeamObj of premierLeagueTable) {
            const { teamName: arrTeamName } = premierLeagueTeamObj;
            if (teamName === arrTeamName) {
                return premierLeagueTeamObj;
            }
        }
        throw new Error(`Could not find team: \`${teamName}\``);
    }

}

export { SportPage };