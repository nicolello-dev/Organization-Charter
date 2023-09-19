import type { EmployeeWithTeam } from "@/types/common/employees";

import { groupBy } from "@/lib/groupBy";

import Domain from "@/components/domain";

import { visualClasses } from "@/constants/constants";

import { Type as TribeTypes } from "@prisma/client";

function borderColor(tribeType: TribeTypes) {
    switch(tribeType) {
        case "ProductOffering":
            return "border-[#76909b]";
        case "Global":
            return "border-[#c57c9f]";
        default:
            return "border-[#0097a6]";
    }
}

export default function TribeArea({ employees, tribeAreaName }: { employees: EmployeeWithTeam[], tribeAreaName: string }) {
    const domains = groupBy(employees, (e: EmployeeWithTeam) => e.team.domain || "");
    const color = borderColor(employees[0]?.team.type ?? "Global");

    return <div className={`${visualClasses} ${color}`}>
        <h2 className="text-2xl">{tribeAreaName || "No tribe area"}</h2>
        {
            Object.entries(domains).map(([tribeArea, employees], i) => {
                return <Domain key={i} domainName={tribeArea} employees={employees} />
            })
        }
    </div>
}