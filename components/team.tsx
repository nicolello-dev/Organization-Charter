import { EmployeeWithTeam } from "@/types/common/employees";

export default function Team({ teamName, employees }: { teamName: string, employees: EmployeeWithTeam[] }) {
    return <>
    <h4 className="text-lg">{teamName}</h4>
        {
            employees.map((e, i) => <p key={i}>{e.name}</p>)
        }
    </>
}