import { EmployeeWithTeam } from "@/types/common/employees";

import { visualClasses } from "@/constants/constants";

export default function Team({ teamName, employees }: { teamName: string, employees: EmployeeWithTeam[] }) {
    return <div className={`${visualClasses} border-blue-400 border-dashed`}>
    <h4 className="text-lg">{teamName}</h4>
    <p className="font-bold mb-3">{employees[0]?.team.team_lead}</p>
        {
            employees.map((e, i) => <p key={i}>{e.name}</p>)
        }
    </div>
}