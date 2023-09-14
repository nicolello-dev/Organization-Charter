import { filterContext } from "@/pages";

import { Context, useContext, useEffect, useState } from "react";

import type { Employee, Team } from "@prisma/client";

import type { filterContextType } from "@/pages/index";

import { groupBy } from "@/lib/groupBy";
import Tribe from "@/components/tribe";

interface EmployeeWithTeam extends Employee {
    team: Team;
}

export default function ViewData({ tribes, isLoading, fetchNewData }: { tribes: Record<string, EmployeeWithTeam[]>, isLoading: boolean, fetchNewData:(filtersCtx: filterContextType) => void }) {

    const filtersCtx = useContext(filterContext);

    useEffect(() => {
        fetchNewData(filtersCtx);
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