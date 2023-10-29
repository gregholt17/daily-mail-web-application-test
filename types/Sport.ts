type PremierLeagueTable = PremierLeagueTableTeamStats[];

type PremierLeagueTeamName = "Tottenham" | "Man City" | "Arsenal" | "Liverpool" |
    "Aston Villa" | "Newcastle" | "Brighton" | "Man Utd" | "West Ham" | 
    "Chelsea" | "Crystal Palace" | "Wolves" | "Fulham" | "Brentford" | "Nottm Forest"
    | "Everton" | "Luton" | "Burnley" | "Bournemouth" | "Sheff Utd"

type PremierLeagueTableTeamStats = {
    position: number;
    teamName: PremierLeagueTeamName;
    gamesPlayed: number;
    points: number;
}

export { PremierLeagueTeamName, PremierLeagueTable, PremierLeagueTableTeamStats };