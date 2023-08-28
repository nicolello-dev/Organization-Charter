export type EmployeeGUIData = {
    id: string
    name: string
    team: string
    functional_lead: string | null
}

export type EmployeeToBeMade = {
    name: string
    team: string
    functional_lead: string | null
}

export type EmployeeReq = {
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