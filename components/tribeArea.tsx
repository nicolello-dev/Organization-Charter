import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

import Domain from "@/components/domain";

import { visualClasses } from "@/constants/constants";

import { Type as TribeTypes } from "@prisma/client";

function borderColor(tribeType: TribeTypes) {
    switch(tribeType) {
        case "ProductOffering":
            return "PO";
        case "Global":
            return "Global";
        default:
            return "RB";
    }
}

export default function TribeArea({ employees, tribeAreaName }: { employees: EmployeeWithTeam[], tribeAreaName: string }) {
    const domains = groupBy(employees, (e: EmployeeWithTeam) => e.team.domain || "");
    const color = borderColor(employees[0]?.team.type ?? "Global");

    return <div className={`${visualClasses} border-[${color}]`}>
        <h2 className="text-2xl">{tribeAreaName || "No tribe area"}</h2>
        <p className="p-1 bg-blue-400 w-max">{employees[0]?.team.tribe_area_lead || "No tribe area lead"}</p>
        {
            Object.entries(domains).map(([tribeArea, employees], i) => {
                return <Domain key={i} domainName={tribeArea} employees={employees} color={color}/>
            })
        }
    </div>
}