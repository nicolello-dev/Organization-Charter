import { Employee } from "@prisma/client";

export default function Employee({ employee }: { employee: Employee }) {
    return <p>{employee.name}</p>
}