import type { Team } from "@/types/common/teams";

import fetch from "node-fetch"

export async function getTeamInfo(team: string): Promise<Team | null> {
    /* Returns related data of the team as specified in the teams.json file */
    const teamData = await (await fetch("https://organization-charter.nicolello.repl.co/teams.json")).json() as Team[];
    return teamData.find(t => t.Team == team) || null;
}