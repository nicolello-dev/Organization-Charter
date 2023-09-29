import { groupBy } from "@/lib/groupBy";
import { EmployeeWithTeam } from "@/types/common/employees";
import TribeArea from "./tribeArea";

import { visualClasses } from "@/constants/constants";

export default function Tribe({ tribeName, employees }: { tribeName: string, employees: EmployeeWithTeam[]}) {
    const tribeAreas = groupBy(employees, (e: EmployeeWithTeam) => e.team.tribe_area || "");
    return <div className={`${visualClasses} border-black`}>
        <h1 className="text-4xl">{tribeName}</h1>
        <p className="p-1 bg-blue-400 w-max">{employees[0]?.team.tribe_lead || "No tribe lead"}</p>
        <div className="flex flex-row flex-wrap justify-center">
            {
                Object.entries(tribeAreas).map(([tribeArea, employees], i) => {
                    return <TribeArea key={i} tribeAreaName={tribeArea} employees={employees} />
                })
            }
        </div>
    </div>
}