import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

import Domain from "@/components/domain";

export default function TribeArea({ employees, tribeAreaName }: { employees: EmployeeWithTeam[], tribeAreaName: string }) {
    const domains = groupBy(employees, (e: EmployeeWithTeam) => e.team.domain || "");
    return <>
        <h2 className="text-2xl">{tribeAreaName}</h2>
        {
            Object.entries(domains).map(([tribeArea, employees], i) => {
                return <Domain key={i} domainName={tribeArea} employees={employees} />
            })
        }
    </>
}