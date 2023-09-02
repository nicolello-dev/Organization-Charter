import type { EmployeeFromSheets } from "types/common/employees";

import { prisma } from "prisma/prisma";

type SheetTeam = {
    "Team": string,
    "Team Lead": string,
    "Domain": string,
    "Domain Lead": string,
    "Tribe Area": string,
    "Tribe Area Lead": string,
    "Tribe": string,
    "Tribe Lead": string
}

export async function updateData() {

    console.log("Started fetching new data");
    
    const res = await fetch('https://organization-charter.nicolello.repl.co/teams.json');
    const teams: SheetTeam[] = await res.json();
    
    await prisma.team.deleteMany({});
    await prisma.team.create({
        data: {
            name: "",
            team_lead: "",
        }
    })
    await prisma.team.createMany({
        data: teams.map(team => { return {
            name: team.Team,
            team_lead: team["Team Lead"],
            domain: team.Domain,
            domain_lead: team["Domain Lead"],
            tribe_area: team["Tribe Area"],
            tribe_area_lead: team["Tribe Area Lead"],
            tribe: team.Tribe,
            tribe_lead: team["Tribe Lead"]
        }})
    });

    console.log('Finished updating teams! Now with employees');
    
    const employeeData = await (await fetch('https://organization-charter.nicolello.repl.co/calls.json')).json() as EmployeeFromSheets[]

    console.log("Employees requested from API, loading into DB");
    
    await prisma.employee.deleteMany({});
    await prisma.employee.createMany({
        data: employeeData.map((employee, i) => {
            return {
                name: employee["Employee Name"],
                functional_lead: employee["Functional Lead"],
                teamName: employee.Team || ""
            }
        })
    });
    console.log("Finished updating data!");
}