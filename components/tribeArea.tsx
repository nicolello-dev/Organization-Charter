import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

export default function TribeArea({ employees }: { employees: EmployeeWithTeam[] }) {
    const tribeAreas = groupBy(employees, (e: EmployeeWithTeam) => e.team.tribe_area || "");
    return <>
        {
            Object.entries(tribeAreas).map(e => {
                const [tribeName, tribeEmployees] = e;
                return <>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            {
                                tribeEmployees?.map(e => <p key={e.id}>{e.name}</p>)
                            }
                        </div>
                    </div>
                </>
            })
        }
    </>
}