import Head from "next/head";

import { createContext, useEffect, useState } from "react";

import Filter from "@/components/filter"
import ViewData from "@/components/viewData";

import { filters } from "@/constants/filters";

import type { Employee } from "@prisma/client";
import { leadmod } from "@/constants/constants";

const filter: FiltersType = {} as FiltersType;
filters.forEach(f => {
  filter[f as keyof FiltersType] = '';
  filter[f + leadmod as keyof FiltersType] = '';
})

export type FiltersType = {
  team: string,
  "team lead": string,
  area: string,
  "area lead": string,
  function: string,
  "function lead": string,
  tribe: string,
  "tribe lead": string
}

type filterContextType = {
  filters: FiltersType
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  employees: Employee[] | undefined
}

export const filterContext = createContext<filterContextType>({
  filters: filter,
  setFilters: () => filter,
  employees: undefined
});

export default function Home() {

  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);
  const [filters, setFilters] = useState<FiltersType>(filter);

  useEffect(() => {
    fetch('/api/getSheet')
      .then(r => r.json())
      .then((r: Employee[]) => setEmployees(r))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <title>Organization Charter - Improved</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
        <filterContext.Provider value={{
          filters: filters,
          setFilters: setFilters,
          employees: employees
        }}>
          <Filter/>
          <ViewData rawData={employees}/>
        </filterContext.Provider>
      </main>
    </>
  );
}