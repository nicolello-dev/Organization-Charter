import { filterContext } from "@/pages";
import { useContext } from "react";

export default function Filters() {

    const filtersNames = [
        'team', 'area', 'function', 'tribe'
    ];

    const filtersctx = useContext(filterContext);
    console.log(filtersctx);

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>, filterName: string) {
        const newValue = e.target.value;
        const newObj = filtersctx.filtersData;
        newObj[filterName] = newValue;
        filtersctx.filtersData = newObj;
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
                            <input className="border-gray-300 border-2 mb-4 p-1" type="text" defaultValue={filtersctx.filtersData[filter]} onChange={(e) => {
                                handleFilterChange(e, filter);
                            }}/>
                            <p className="m-2">{filter} lead:</p>
                            <input className="border-gray-300 border-2 mb-4 p-1" type="text" defaultValue={filtersctx.filtersData[filter + ' lead']} onChange={(e) => {
                                handleFilterChange(e, filter + ' lead');
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