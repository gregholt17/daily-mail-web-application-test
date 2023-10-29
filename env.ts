import * as dotenv from 'dotenv';
dotenv.config();

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
    PREMIER_LEAGUE_TEAM_NAME: process.env.PREMIER_LEAGUE_TEAM,
    PREMIER_LEAGUE_TEAM_EXPECTED_POSITION,
    PREMIER_LEAGUE_TEAM_EXPECTED_POINTS

}

export { ENV_VARS };