import type { Employee } from "@prisma/client";

export type Team = {
    name: string
    employees: Employee[]
    lead: string
}

export type Domain = {
    name: string
    teams: Team[]
    lead: string
}

export type Tribe = {
    name: string
    domains: Domain[]
    lead: string
}

export type TribeArea = {
    name: string
    tribes: Tribe[]
    lead: string
}