import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, type Employee } from '@prisma/client';

import type { Filter } from "@/types/common/filters";

const prisma = new PrismaClient();

type Request = NextApiRequest & {
    query: {
        name: string,
        functionalLead: string,
        teamName: string,
        teamLead: string,
        domain: string,
        domainLead: string,
        tribeArea: string,
        tribeAreaLead: string,
        tribe: string,
        tribeLead: string
    }
}

export default async function Handler(req: Request, res: NextApiResponse<Employee[]>) {

    const { name, functionalLead, teamName, teamLead, domain, domainLead, tribeArea, tribeAreaLead, tribe, tribeLead } = req.query as Filter;

    try {
        // Thank you ChatGPT :)
        const employees = await prisma.employee.findMany({
            where: {
                name: {
                    contains: name
                },
                functional_lead: functionalLead || undefined,
                team: {
                    name: teamName || undefined,
                    team_lead: teamLead || undefined,
                    domain: domain || undefined,
                    domain_lead: domainLead || undefined,
                    tribe_area: tribeArea || undefined,
                    tribe_area_lead: tribeAreaLead || undefined,
                    tribe: tribe || undefined,
                    tribe_lead: tribeLead || undefined
                },
            },
        });
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
}
