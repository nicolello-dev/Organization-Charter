import { filterContext } from "@/pages";

import { useContext, useEffect, useState } from "react";

import type { Employee, Team } from "@prisma/client";

import Empl from "@/components/Employee";

import { groupBy } from "@/lib/groupBy";
import TribeArea from "./tribeArea";

interface EmployeeWithTeam extends Employee {
    team: Team;
}

export default function ViewData(){

    const [tribeAreas, setTribeAreas] = useState<Record<string, EmployeeWithTeam[]>>({} as Record<string, EmployeeWithTeam[]>);
    const [isLoading, setLoading] = useState<boolean>(false);
    const filtersCtx = useContext(filterContext);

    useEffect(() => {
        fetch(`/api/getFilteredEmployees?name=${filtersCtx.filters.name}&functionalLead=${filtersCtx.filters.functionalLead}&teamName=${filtersCtx.filters.teamName}&teamLead=${filtersCtx.filters.teamLead}&domain=${filtersCtx.filters.domain}&domainLead=${filtersCtx.filters.domainLead}&tribeArea=${filtersCtx.filters.tribeArea}&tribeAreaLead=${filtersCtx.filters.tribeAreaLead}&tribe=${filtersCtx.filters.tribe}&tribeLead=${filtersCtx.filters.tribeLead}`)
            .then(r => r.json())
            .then((r: EmployeeWithTeam[]) => {
                const t = groupBy(r, (e: EmployeeWithTeam) => e.team.tribe_area || "");
                console.log(t);
                setTribeAreas(t);
                setLoading(false);
                console.log(tribeAreas);
            })
    }, [filtersCtx.filters?.name]);

    if(isLoading) {
        return <h1 className="text-xl">Loading...</h1>
    }

    return <>
        {
            Object.keys(tribeAreas).map(tribeName => {
                const tribeAreaEmployees = tribeAreas[tribeName];
                return <>
                <div className="flex flex-col">
                    <h1 className="text-2xl">{tribeName}</h1>
                    <div className="flex flex-col">
                        {
                            tribeAreaEmployees?.map((e: EmployeeWithTeam) => <TribeArea key={e.id} employees={tribeAreaEmployees}/>)
                        }
                    </div>
                </div>
                </>
            })
        }
    </>
}