import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/client";

import type { EmployeeReq, EmployeeData } from "@/components/types";

function toEmployeeData(employee: EmployeeReq): EmployeeData {
    return {
        name: employee["Employee Name"],
        functional_lead: employee["Functional Lead"],
        team: employee["Team"],
        office: employee["Office"]
    }
}

function toEmployeesData(employees: EmployeeReq[]): EmployeeData[] {
    let res: EmployeeData[] = [];
    employees.forEach(e => res.push(toEmployeeData(e)));
    return res;
}

async function createNewDatapointWithEmployees(r:EmployeeReq[]) {
    // Create a new datapoint
    const dp = await prisma.datapoint.create({
        data: {
        }
    });
    for(const employee of r) {
        await prisma.employee.create({
            data: {
                ...toEmployeeData(employee),
                datapointId: dp.id
            }
        })
    }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<EmployeeData[]>) {

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
                res.status(200).send(toEmployeesData(r));
                console.log("Data completely empty! Fetched new data");
            })
            .catch(err => {
                console.error("Error occurred! [length == 0]", err);
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
                res.status(200).json(toEmployeesData(r));
            })
            .catch(err => {
                console.error("Error occurred! [deltaT > refresh]", err)
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
        console.log("Data young enough! Got it from DB");
        res.status(200).send(employees);
        return;
    }
}