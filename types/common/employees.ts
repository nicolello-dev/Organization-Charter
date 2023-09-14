import { Employee, Team } from "@prisma/client"

export type EmployeeFromSheets = {
    id: string
    'Employee Name': string
    Email: string
    "Personio Active?": string
    Position: string
    "Position Status": string
    "Employee Type": string
    "Functional Lead": string | null
    Team: string
    Office: string
    "Legal Entity in List": string
    "PMD Creator": string
}

export type EmployeeWithTeam = Employee & {
    team: Team
}