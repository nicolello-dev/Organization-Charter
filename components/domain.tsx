import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

import Team from "./team";

import { visualClasses } from "@/constants/constants";

export default function Domain({ employees, domainName, color }: { employees: EmployeeWithTeam[], domainName: string, color: string }) {
    const teams = groupBy(employees, (e: EmployeeWithTeam) => e.team.name || "");
    return <div className={`${visualClasses} border-[${color}] bg-[${color}]`}>
        <h3 className="text-xl">{domainName || "No domain"}</h3>
        <p className="p-1 bg-blue-400 w-max">{employees[0]?.team.domain_lead || "No domain lead"}</p>
        <div className="flex flex-row flex-wrap justify-center">
        {
            Object.entries(teams).map(([teamName, employees], i) => {
                return <Team key={i} teamName={teamName} employees={employees} />
            })
        }
        </div>
    </div>
}