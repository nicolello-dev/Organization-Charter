import { groupBy } from "@/lib/groupBy";
import { EmployeeWithTeam } from "@/types/common/employees";
import TribeArea from "./tribeArea";

import { visualClasses } from "@/constants/constants";

export default function Tribe({ tribeName, employees }: { tribeName: string, employees: EmployeeWithTeam[]}) {
    const tribeAreas = groupBy(employees, (e: EmployeeWithTeam) => e.team.tribe_area || "");
    return <div className={`${visualClasses} border-black`}>
        <h1 className="text-4xl">{tribeName}</h1>
        {
            Object.entries(tribeAreas).map(([tribeArea, employees], i) => {
                return <TribeArea key={i} tribeAreaName={tribeArea} employees={employees} />
            })
        }
    </div>
}