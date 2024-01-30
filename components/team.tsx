import { EmployeeWithTeam } from "@/types/common/employees";

import { visualClasses } from "@/constants/constants";
import { Employee } from "./Employee";

export default function Team({
  teamName,
  employees,
}: {
  teamName: string;
  employees: EmployeeWithTeam[];
}) {
  return (
    <div className={`${visualClasses} border-dashed border-white`}>
      <h4 className="text-lg">{teamName}</h4>
      <p className="w-max bg-blue-400 p-1">
        {employees[0]?.team.team_lead || "No team lead"}
      </p>
      {employees.map((e, i) => (
        <Employee key={i} employee={e} />
      ))}
    </div>
  );
}
