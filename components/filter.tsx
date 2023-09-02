import { filterContext } from "@/pages";
import { useContext } from "react";

import type { Filter } from "@/types/common/filters";

export default function Filters() {

    const filtersNames = [
        'name'
    ];

    const filtersctx = useContext(filterContext);

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>, filterName: string) {
        const newValue = e.target.value;
        if(!filtersctx.setFilters) {
            return;
        }
        filtersctx.setFilters((prev: Filter | undefined) => { return {
            ...prev,
            [filterName]: newValue
        }})
    }

    return (
        <>
        <h1 className="text-xl m-6">
            Filters:
        </h1>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            {
                filtersNames.map((filter, i) => 
                        <div key={i} className="text-center">
                            <p className="m-2">{filter}:</p>
                            <input className="border-gray-300 border-2 mb-4 p-1" type="text" defaultValue={filtersctx.filters && filtersctx.filters[filter as keyof Filter]} onChange={(e) => {
                                handleFilterChange(e, filter);
                            }}/>
                        </div>
                    )
            }
        </div>
        <button className="bg-black text-white p-3 m-4 rounded-xl">
            Filter
        </button>
        </>
    )
}