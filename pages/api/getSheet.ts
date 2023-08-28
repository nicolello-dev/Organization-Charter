import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";
import type { Employee } from "@prisma/client";

import { getDataAndAddToDB } from "lib/api/getSheet";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {

    const apiURL: string | undefined = process.env.SHEETDB_ENDPOINT;

    if(apiURL === undefined) {
        res.status(500).send("API URL NOT DEFINED!");
        throw new Error("API URL NOT DEFINED!");
        return;
    }

    const length = await prisma.datapoint.count();

    if(length == 0) {
        // No data available, must add
        await getDataAndAddToDB(apiURL, res);
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

    if(timeDifference > Number(process.env.REFRESH_TIME) || true) { // If data is older than 24 hours, fetch new data
        await getDataAndAddToDB(apiURL, res);
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
        res.status(200).send("Completed successfully!");
        console.log("Data young enough! Got it from DB");
        return;
    }
}