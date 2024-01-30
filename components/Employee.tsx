import { Employee } from "@prisma/client";

export default function Employee({ employee }: { employee: Employee }) {
  return (
    <p title={"Position: " + employee.position || "No position found"}>
      {employee.name}
    </p>
  );
}
