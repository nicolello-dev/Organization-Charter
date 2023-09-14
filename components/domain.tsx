import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

import Team from "./team";

export default function Domain({ employees, domainName }: { employees: EmployeeWithTeam[], domainName: string }) {
    const teams = groupBy(employees, (e: EmployeeWithTeam) => e.team.name || "");
    return <div className="m-6 p-3 border border-black">
        <h3 className="text-xl">{domainName || "No domain"}</h3>
        {
            Object.entries(teams).map(([teamName, employees], i) => {
                return <Team key={i} teamName={teamName} employees={employees} />
            })
        }
    </div>
}