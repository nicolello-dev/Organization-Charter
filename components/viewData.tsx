import { filterContext } from "@/pages";

import { useContext, useEffect, useState } from "react";

import type { Employee, Team } from "@prisma/client";

import { groupBy } from "@/lib/groupBy";
import Tribe from "@/components/tribe";

interface EmployeeWithTeam extends Employee {
    team: Team;
}

export default function ViewData(){

    const [tribes, setTribes] = useState<Record<string, EmployeeWithTeam[]>>({} as Record<string, EmployeeWithTeam[]>);
    const [isLoading, setLoading] = useState<boolean>(false);
    const filtersCtx = useContext(filterContext);

    useEffect(() => {
        fetch(`/api/getFilteredEmployees?name=${filtersCtx.filters.name}&functionalLead=${filtersCtx.filters.functionalLead}&teamName=${filtersCtx.filters.teamName}&teamLead=${filtersCtx.filters.teamLead}&domain=${filtersCtx.filters.domain}&domainLead=${filtersCtx.filters.domainLead}&tribeArea=${filtersCtx.filters.tribeArea}&tribeAreaLead=${filtersCtx.filters.tribeAreaLead}&tribe=${filtersCtx.filters.tribe}&tribeLead=${filtersCtx.filters.tribeLead}`)
            .then(r => r.json())
            .then((r: EmployeeWithTeam[]) => {
                const t = groupBy(r, (e: EmployeeWithTeam) => e.team.tribe || "");
                setTribes(t);
                setLoading(false);
            })
    }, [filtersCtx.filters?.name]);

    if(isLoading) {
        return <h1 className="text-xl">Loading...</h1>
    }

    return <>
        {
            Object.keys(tribes).map((tribeName, i) => {
                const tribeEmployees = tribes[tribeName];
                if (!tribeEmployees) return null;
                return <Tribe key={i} tribeName={tribeName} employees={tribeEmployees} />
              })
        }
    </>
}