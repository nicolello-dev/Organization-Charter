import { EmployeeWithTeam } from "@/types/common/employees";

export default function Team({ teamName, employees }: { teamName: string, employees: EmployeeWithTeam[] }) {
    return <div className="m-4 p-2 border border-blue-400">
    <h4 className="text-lg">{teamName}</h4>
        {
            employees.map((e, i) => <p key={i}>{e.name}</p>)
        }
    </div>
}