import { NextApiResponse } from "next";
import type { EmployeeReq, EmployeeToBeMade } from "types/common/employees";

import { prisma } from "prisma/prisma";
import type { Team } from "@prisma/client";

export function empReq2EmpTobemade(e: EmployeeReq): EmployeeToBeMade {
    return {
        name: e['Employee Name'],
        functional_lead: e['Functional Lead'],
        team: e.Team
    }
}

async function createNewDatapointWithEmployees(e: EmployeeReq[]) {
    // Update the teams
    const teams: Team[] = await (await fetch('/teams.json')).json();
    for(const team of teams) {
        await prisma.team.update({
            where: {
                name: team.name
            },
            data: {
                ...team
            }
        });
    }
    // Create a new datapoint
    const dp = await prisma.datapoint.create({
        data: {
        }
    });
    const employeeData = [];
    for(const employee of e) {
        employeeData.push({
            ...empReq2EmpTobemade(employee),
            datapointId: dp.id
        });
    }
    await prisma.employee.createMany({
        data: employeeData.map(employee => {
            return {
                ...employee,
                teamName: employee.team
            }
        })
    });
}

export async function getDataAndAddToDB(apiURL: string, res: NextApiResponse<string>) {
    await fetch(apiURL)
        .then((r) => r.json())
        .then(async (r: EmployeeReq[]) => {
            await createNewDatapointWithEmployees(r);
            res.status(200).send("New data fetched and saved to the database");
        })
        .catch(err => {
            res.status(500).send(`Error occurred while fetching new data: ${err}`);
        });
    return;
}