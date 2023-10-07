import { EmployeeWithTeam } from "@/types/common/employees";

import { visualClasses } from "@/constants/constants";

export default function Team({ teamName, employees }: { teamName: string, employees: EmployeeWithTeam[] }) {
    return <div className={`${visualClasses} border-white border-dashed`}>
    <h4 className="text-lg">{teamName}</h4>
    <p className="p-1 bg-blue-400 w-max">{employees[0]?.team.team_lead || "No team lead"}</p>
        {
            employees.map((e, i) => <p key={i}>{e.name}</p>)
        }
    </div>
}