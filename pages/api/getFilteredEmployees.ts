import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from 'prisma/prisma';

import type { Employee } from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse<Employee[]>) {

    const { name } = req.query;

    if (name == undefined) {
        res.status(400).json([]);
        return;
    }

    try {
        const latestDatapoint = await prisma.datapoint.findFirst({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true
            }
        });
        if (!latestDatapoint || !latestDatapoint.id) {
            throw new Error("Datapoint does not exist!");
        }
        const employees = await prisma.employee.findMany({
            where: {
                datapointId: latestDatapoint.id,
                name: {
                    contains: name as string
                }
            }
        })
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json([]);
        return;
    }
}