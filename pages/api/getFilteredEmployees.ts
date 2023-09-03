import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, type Employee } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Handler(req: NextApiRequest, res: NextApiResponse<Employee[]>) {

    const { name, functionalLead, teamName, teamLead, domain, domainLead, tribeArea, tribeAreaLead, tribe, tribeLead } = req.query;

    try {
        console.log(name, functionalLead, teamName, teamLead, domain, domainLead, tribeArea, tribeAreaLead, tribe, tribeLead);
        // Thank you ChatGPT :)
        const employees = await prisma.employee.findMany({
            where: {
                name,
                functional_lead: functionalLead,
                team: {
                    name: teamName,
                    team_lead: teamLead,
                    domain: domain,
                    domain_lead: domainLead,
                    tribe_area: tribeArea,
                    tribe_area_lead: tribeAreaLead,
                    tribe: tribe,
                    tribe_lead: tribeLead
                },
            },
        });
        console.log("everything went fine!");
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
}
