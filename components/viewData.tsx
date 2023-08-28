import { type FiltersType, filterContext } from "@/pages";
import type { Team, Domain, Tribe, TribeArea } from "@/types/components/viewData";
import { teamInfo } from "@/lib/components/viewData";
import { filters } from "@/constants/filters";

import { useContext } from "react";
import { leadmod } from "@/constants/constants";
import { EmployeeGUIData } from "@/types/common/employees";

type Employee = EmployeeGUIData[] & {
    team_lead: string
}

export default function ViewData(props: {rawData: EmployeeGUIData[] | undefined}){
    const filtersCtx = useContext(filterContext);

    const { rawData } = props;
    if(rawData == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles. If this is the first request of the day, it might take up to 20 seconds</h1>
    }
    return <>
        <h1>
            WIP!
        </h1>
    </>
}