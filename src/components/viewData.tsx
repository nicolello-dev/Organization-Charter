import { type FiltersType, filterContext } from "@/pages";
import type { FunctionType, Tribe, Area, Team } from "@/types/data";
import type { Employee } from "@prisma/client";
import { filters } from "@/constants/filters";

import { useContext } from "react";
import { leadmod } from "@/constants/constants";

export default function ViewData(props: {rawData: Employee[] | undefined}){
    const filtersCtx = useContext(filterContext);

    const { rawData } = props;
    if(rawData == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles. If this is the first request of the day, it might take up to 20 seconds</h1>
    }

    // Tribe -> Function -> Area -> Team
    const tribeHash: {[key: string]: Tribe} = {};
    const functionHash: {[key: string]: FunctionType} = {};
    const areaHash: {[key: string]: Area} = {};
    const teamHash: {[key: string]: Team} = {};
    // filter data when filters change
    const data = rawData.filter(employee => {
        return filters.every(fname => {
            const empData = employee[fname as keyof Employee] || ""; // Employee data
            const empregex = new RegExp(filtersCtx.filters[fname as keyof FiltersType] || ".*"); // Employee regex
            const empDataLead = employee[fname + leadmod as keyof Employee] || ""; // Employee data for leads
            const empregexLead = new RegExp(filtersCtx.filters[fname + leadmod as keyof FiltersType] || ".*"); // Employee regex for lead
            return empData.match(empregex) !== null
            && empDataLead.match(empregexLead) !== null
        })
    })
    for (const employee of data) {
        const team = teamHash[employee.team];
        if(team) {
            team.employees.push(employee);
        } else {
            teamHash[employee.team] = {
                name: employee.team,
                lead: employee.team_lead,
                employees: [employee]
            }
        }
    }
    for (const team of Object.values(teamHash)) {
        if(team.employees[0]) {
            const area = areaHash[team.employees[0]?.area]
            if(area) {
                area.teams.push(team);
            } else {
                areaHash[team.employees[0]?.area] = {
                    name: team.employees[0].area,
                    lead: team.employees[0].area_lead,
                    teams: [team]
                }
            }
        }
    }
    for (const area of Object.values(areaHash)) {
        if(area.teams[0]?.employees[0]) {
            const fun: FunctionType | undefined = functionHash[area.teams[0].employees[0]?.function]
            if(fun) {
                fun.areas.push(area);
            } else {
                functionHash[area.teams[0].employees[0]?.function] = {
                    name: area.teams[0].employees[0].function,
                    lead: area.teams[0].employees[0].function_lead,
                    areas: [area]
                }
            }
        }
    }
    for (const fun of Object.values(functionHash)) {
        if(fun.areas[0]?.teams[0]?.employees[0]) {
            const tribe: Tribe | undefined = tribeHash[fun.areas[0].teams[0].employees[0]?.tribe]
            if(tribe) {
                tribe.functions.push(fun);
            } else {
                tribeHash[fun.areas[0].teams[0].employees[0]?.tribe] = {
                    lead: fun.areas[0].teams[0].employees[0].tribe_lead,
                    functions: [fun]
                }
            }
        }
    }
    return (
        <>
        <div className="flex flex-wrap justify-center">
            {
                Object.keys(tribeHash).map(tribe_name => {
                    const tribe_lead = tribeHash[tribe_name]?.functions[0]?.areas[0]?.teams[0]?.employees[0]?.tribe_lead;
                    return <div key={"tribe"+tribe_name} className="w-6/12 max-w-lg text-center border-2 m-3 p-3 rounded-2xl text-black border-black">
                    <div className="m-3">
                        <h3>{tribe_name}</h3>
                        <h5>{tribe_lead}</h5>
                    </div>
                    {
                    tribeHash[tribe_name]?.functions.map((fun, i) => <div key={"function" + i.toString()} className="p-3 m-2 rounded-xl border-2 border-function/25">
                    <div className="m-3">
                        <h3>{fun.name}</h3>
                        <h5>{fun.lead}</h5>
                        {
                            fun.areas.map(area => {
                                const area_name = area.name;
                                const area_lead = areaHash[area_name]?.lead;
                                return <div key={"area"+area_name} className="p-3 m-2 rounded-xl border-2 border-area">
                                    <div className="m-3">
                                        <h3>{area_name}</h3>
                                        <h5>{area_lead}</h5>
                                    </div>
                                    {
                                    areaHash[area_name]?.teams.map((team, i) => <div key={"team" + i.toString()} className="p-3 m-2 rounded-xl border-2 border-dashed bg-white border-purple-300">
                                        <div className="m-3">
                                            <h3>{team.name}</h3>
                                            <h5>{team.lead}</h5>
                                        </div>
                                        <div className="flex flex-row flex-wrap justify-center">
                                            {team.employees.map((e, i) => <p key={"name"+i.toString()} className="m-2">
                                                    {e.team_member}
                                                </p>
                                            )}
                                        </div>
                                    </div>)
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>)
                    }
                </div>
                })
            }
        </div>
        </>
    )
}