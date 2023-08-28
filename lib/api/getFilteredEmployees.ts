import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from 'prisma/prisma';

import type { EmployeeGUIData } from "types/common/employees";

export default async function Handler(req: NextApiRequest, res: NextApiResponse<EmployeeGUIData[]>) {
    try {
        const latestDatapoint = await prisma.datapoint.findFirst({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                employees: true
            }
        });
        if(!latestDatapoint) {
            res.status(404).json([]);
            return;
        }
        res.status(200).json(latestDatapoint.employees.map(employee => {
            return {
                id: employee.id,
                name: employee.name,
                team: employee.teamName,
                functional_lead: employee.functional_lead
            };
        }));
    } catch(err) {
        res.status(500).send([]);
        return;
    }
}