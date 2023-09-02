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
        const employees = await prisma.employee.findMany({
            where: {
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