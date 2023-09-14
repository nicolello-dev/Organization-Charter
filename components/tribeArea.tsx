import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

export default function TribeArea({ employees, tribeAreaName }: { employees: EmployeeWithTeam[], tribeAreaName: string }) {
    const domains = groupBy(employees, (e: EmployeeWithTeam) => e.team.domain || "");
    return <>
        {
            Object.entries(domains).map((e, i) => {
                const [domainName, domainEmployees] = e;
                return <>
                    <h1 className="text-xl" key={i}>{tribeAreaName}</h1>
                    <div className="flex flex-col">
                        <h1 className="text-xl">{domainName}</h1>
                        <div className="flex flex-col">
                            {
                                domainEmployees?.map(e => <p key={e.id}>{e.name}</p>)
                            }
                        </div>
                    </div>
                </>
            })
        }
    </>
}