import { PremierLeagueTeamName } from "../types/Sport";

class PremierLeagueUtil {

    static isValidTeamName(name: string): name is PremierLeagueTeamName {
        return ([
        "Tottenham",
        "Man City",
        "Arsenal",
        "Liverpool",
        "Aston Villa",
        "Newcastle",
        "Brighton",
        "Man Utd",
        "West Ham",
        "Chelsea",
        "Crystal Palace",
        "Wolves",
        "Fulham",
        "Brentford",
        "Nottm Forest",
        "Everton",
        "Luton",
        "Burnley",
        "Bournemouth",
        "Sheff Utd",
        ] as PremierLeagueTeamName[]).includes(name as PremierLeagueTeamName);
    }

    static validateTeamEnvVar(PREMIER_LEAGUE_TEAM_NAME: string) {
        if (!PREMIER_LEAGUE_TEAM_NAME) {
            throw new Error("Environment variable \`PREMIER_LEAGUE_TEAM_NAME\` is not set.");
        }
        if (!this.isValidTeamName(PREMIER_LEAGUE_TEAM_NAME)) {
            const allowableTeamNames = [
            "Tottenham",
            "Man City",
            "Arsenal",
            "Liverpool",
            "Aston Villa",
            "Newcastle",
            "Brighton",
            "Man Utd",
            "West Ham",
            "Chelsea",
            "Crystal Palace",
            "Wolves",
            "Fulham",
            "Brentford",
            "Nottm Forest",
            "Everton",
            "Luton",
            "Burnley",
            "Bournemouth",
            "Sheff Utd",
            ].join(', ');
            throw new Error(`Invalid team name: \`${PREMIER_LEAGUE_TEAM_NAME}\`.` + 
                ` Allowable team names are: ${allowableTeamNames}`);
        }
    }

}

export { PremierLeagueUtil };