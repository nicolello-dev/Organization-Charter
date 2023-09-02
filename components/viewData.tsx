import { filterContext } from "@/pages";

import { useContext, useEffect, useState } from "react";

import type { Employee } from "@prisma/client";

export default function ViewData(){

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const filtersCtx = useContext(filterContext);

    useEffect(() => {
        fetch(`/api/getFilteredEmployees?name=${filtersCtx.filters?.name}`)
            .then(r => r.json())
            .then(r => {
                setEmployees(r as Employee[]);
                setLoading(false);
            })
    }, [filtersCtx.filters?.name]);

    if(isLoading) {
        return <h1 className="text-xl">Loading...</h1>
    }
    
    return <>
        <p>
            {
                JSON.stringify(employees)
            }
        </p>
    </>
}