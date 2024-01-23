import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prisma";

import type { Filter } from "@/types/common/filters";
import type { EmployeeWithTeam } from "@/types/common/employees";

type Request = NextApiRequest & {
  query: {
    name: string;
    functionalLead: string;
    teamName: string;
    teamLead: string;
    domain: string;
    domainLead: string;
    tribeArea: string;
    tribeAreaLead: string;
    tribe: string;
    tribeLead: string;
  };
};

export default async function Handler(
  req: Request,
  res: NextApiResponse<EmployeeWithTeam[]>,
) {
  const {
    name,
    functionalLead,
    teamName,
    teamLead,
    domain,
    domainLead,
    tribeArea,
    tribeAreaLead,
    tribe,
    tribeLead,
  } = req.query as Filter;

  try {
    // Thank you ChatGPT :)
    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: name,
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
          tribe_lead: tribeLead || undefined,
        },
      },
      include: {
        team: true,
      },
    });
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
}
