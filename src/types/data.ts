import type { Employee } from "@prisma/client"

export interface Team {
    name: string
    lead: string
    employees: Employee[]
}

export interface Area {
    name: string
    lead: string | undefined
    teams: Team[]
}

export interface FunctionType {
    name: string
    lead: string | undefined
    areas: Area[]
}

export interface Tribe {
    lead: string | undefined
    functions: FunctionType[]
}