import { filterContext, filterContextType } from "@/pages";
import { useContext, useEffect } from "react";

import type { Filter } from "@/types/common/filters";
import { Team } from "@prisma/client";
import { nonSelectedString } from "@/constants/constants";

function keyofTeam2filterContext(key: keyof Team & "employees"): keyof filterContextType["filters"] | string {
    console.log("Here!", key)
    switch(key) {
        case "employees":
            return "name";
        case "name":
            return "teamName";
        case "domain_lead":
            return "domainLead";
        case "team_lead":
            return "teamLead";
        case "tribe_area":
            return "tribeArea";
        case "tribe_area_lead":
            return "tribeAreaLead";
        case "tribe_lead":
            return "tribeLead";
        default:
            // eslint-disable-next-line
            return key
    }
}

function prettify(str: string) {
    switch(str) {
        case "employees":
            return "Team member"
        case "name":
            return "team name";
        default:
            return str.replaceAll("_", " ");
    }
}

function Legend() {
    const colors = [
        {
            name: "Tribe",
            color: "#000000"
        },
        {
            name: "Product Offering",
            color: "#76909b"
        },
        {
            name: "Global",
            color: "#c57c9f"
        },
        {
            name: "Regional Business",
            color: "#0097a6"
        }
    ];

    return <div className="flex flex-row gap-4 my-6">
        Legend:
        {
            colors.map((color, i) => {
                return <div key={i} className="flex flex-row items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: color.color}}></div>
                    <p>{color.name}</p>
                </div>
            })
        }
    </div>
}

let firstLoad = true;

export default function Filters(
    {
        handleReloadFilters,
        uniqueValues
    }:{ 
        handleReloadFilters: (filtersCtx: filterContextType) => void,
        uniqueValues: {[key in keyof Team]: (string | null)[] | undefined}
    }
) {

    // Exclude empty values
    Object.keys(uniqueValues).forEach(key => {
        uniqueValues[key as keyof Team] = uniqueValues[key as keyof Team]?.filter(v => ![undefined, null, ""].includes(v));
    });

    const filtersctx = useContext(filterContext);
    
    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>, filterName: keyof Team & "employees") {
        const newValue = e.target.value;
        if(!filtersctx.setFilters) {
            return;
        }
        filtersctx.setFilters((prev: Filter) => { return {
            ...prev,
            [keyofTeam2filterContext(filterName)]: newValue == nonSelectedString ? "" : newValue
        }});
    }

    useEffect(() => {
        !firstLoad && handleReloadFilters(filtersctx);
        firstLoad = false;
    }, [filtersctx.filters]);

    return (
        <>
        <h1 className="text-xl m-6">
            Filters:
        </h1>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            {
                Object.keys(uniqueValues).map((filter, i) => 
                        // Exclude the type filter since it's not used in the filter API
                        filter != "type" && <div key={i} className="text-center m-1 p-2 border rounded-xl border-gray-200">
                            <p className="m-2">{prettify(filter)}:</p>
                            <select onChange={e => handleFilterChange(e, filter as keyof Team & "employees")}>
                                <option>
                                    {nonSelectedString}
                                </option>
                                {
                                    uniqueValues[filter as keyof Team]?.map((value, i) => 
                                        <option key={i} value={value || ""}>{value}</option>
                                    )
                                }
                            </select>
                        </div>
                    )
            }
        </div>
        <Legend/>
        </>
    )
}