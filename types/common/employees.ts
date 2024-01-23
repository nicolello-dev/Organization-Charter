import { Employee, Team } from "@prisma/client";

export type EmployeeWithTeam = Employee & {
  team: Team;
};
