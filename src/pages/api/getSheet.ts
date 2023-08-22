import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";

interface EmployeeReq {
    "Team Member": string;
    Competence: string;
    Team: string;
    Area: string;
    Function: string;
    Tribe: string;
    "Competence Lead": string;
    "Team Lead": string;
    "Area Lead": string;
    "Function Lead": string;
    "Tribe Lead": string;
}

interface Employee {
  team_member:     string;
  competence:      string;
  team:            string;
  area:            string;
  function:        string;
  tribe:           string;
  competence_lead: string;
  team_lead:       string;
  area_lead:       string;
  function_lead:   string;
  tribe_lead:      string;
}

function EmployeeReqToEmployee(req: EmployeeReq): Employee {
    return {
        team_member: req["Team Member"],
        competence: req.Competence,
        team: req.Team,
        area: req.Area,
        function: req.Function,
        tribe: req.Tribe,
        competence_lead: req["Competence Lead"],
        team_lead: req["Team Lead"],
        area_lead: req["Area Lead"],
        function_lead: req["Function Lead"],
        tribe_lead: req["Tribe Lead"]
    };
}


async function createNewDatapointWithEmployees(r:EmployeeReq[]) {
    // Create a new datapoint
    const dp = await prisma.datapoint.create({
        data: {
        }
    });
    const employeeData = [];
    for(const employee of r) {
        employeeData.push({
            ...EmployeeReqToEmployee(employee),
            datapointId: dp.id
        })
    }
    await prisma.employee.createMany({
        data: employeeData
    })
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Employee[]>) {

    const apiURL: string | undefined = process.env.SHEETDB_ENDPOINT;

    if(apiURL === undefined) {
        console.error("API URL NOT DEFINED!");
        res.status(500).send([]);
        return;
    }

    const length = await prisma.datapoint.count();

    if(length == 0) {
        // No data available, must add
        await fetch(apiURL)
            .then((r) => r.json())
            .then(async (r: EmployeeReq[]) => {
                await createNewDatapointWithEmployees(r);
                res.status(200).send(r.map(e => EmployeeReqToEmployee(e)));
                console.log("Data completely empty! Fetched new data");
            })
            .catch(err => {
                console.error("Error occurred while fetching new data!", err);
                res.status(500).send([]);
            });
        return;
    }

    // Since data does exist, let's query for the latest one
    const latestData = await prisma.datapoint.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    });
                                                    // For typescript
    const dataTime = new Date(latestData?.createdAt || "").getTime();
    const nowTime = new Date().getTime();
    const timeDifference = (nowTime - dataTime); // Time difference in ms

    if(timeDifference > Number(process.env.REFRESH_TIME)) { // If data is older than 24 hours, fetch new data
        await fetch(apiURL)
            .then(r => r.json())
            // Add such data to the database before returning it
            .then(async (r: EmployeeReq[]) => {
                await createNewDatapointWithEmployees(r);
                res.status(200).json(r.map(e => EmployeeReqToEmployee(e)));
            })
            .catch(err => {
                console.error("Error occurred! [@ deltaT > refresh]", err)
                res.status(500).json([]);
            });
        console.log("Data stale, fetched new data");
        return;
    } else {
        // Data is young enough, just get it from the db
        const youngestDatapoint = await prisma.datapoint.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const employees = await prisma.employee.findMany({
            where: {
                datapointId: {
                    equals: youngestDatapoint?.id
                }
            }
        })
        res.status(200).send(employees);
        console.log("Data young enough! Got it from DB");
        return;
    }
}