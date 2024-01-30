import { Employee } from "@prisma/client";

export function Employee({ employee }: { employee: Employee }) {
  console.log(employee);
  return (
    <p title={`Position: ${employee.position || "No position found!"}`}>
      {employee.name}
    </p>
  );
}
