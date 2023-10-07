import Head from "next/head";

import { createContext, useContext, useEffect, useState } from "react";

import Filter from "@/components/filter"
import ViewData from "@/components/viewData";

import type { Filter as Filters } from "@/types/common/filters";
import { EmployeeWithTeam } from "@/types/common/employees";
import { groupBy } from "@/lib/groupBy";
import { prisma } from "@/prisma/prisma";
import { Team } from "@prisma/client";

export type filterContextType = {
    filters: Filters,
    setFilters: React.Dispatch<React.SetStateAction<Filters>> | undefined
}

const initialFilter: Filters = {
    name: "",
    functionalLead: "",
    teamName: "",
    teamLead: "",
    domain: "",
    domainLead: "",
    tribe: "",
    tribeLead: "",
    tribeArea: "",
    tribeAreaLead: ""
}

export const filterContext = createContext<filterContextType>({
  filters: initialFilter,
  setFilters: undefined
});

export default function Home({ uniqueValues }: { uniqueValues: {[key in keyof Team]: (string | null)[] | undefined}}) {

  const [filters, setFilters] = useState<Filters>(initialFilter);
  const [tribes, setTribes] = useState<Record<string, EmployeeWithTeam[]>>({} as Record<string, EmployeeWithTeam[]>);
  const [isLoading, setLoading] = useState<boolean>(false);

  function fetchNewData(filtersCtx: filterContextType) {
      fetch(`/api/getFilteredEmployees?&name=${filtersCtx.filters.name}&functionalLead=${filtersCtx.filters.functionalLead}&teamName=${filtersCtx.filters.teamName}&teamLead=${filtersCtx.filters.teamLead}&domain=${filtersCtx.filters.domain}&domainLead=${filtersCtx.filters.domainLead}&tribeArea=${filtersCtx.filters.tribeArea}&tribeAreaLead=${filtersCtx.filters.tribeAreaLead}&tribe=${filtersCtx.filters.tribe}&tribeLead=${filtersCtx.filters.tribeLead}`)
          .then(r => r.json())
          .then((r: EmployeeWithTeam[]) => {
              const t = groupBy(r, (e: EmployeeWithTeam) => e.team.tribe || "");
              setTribes(t);
              setLoading(false);
          })
  }

  return (
    <>
      <Head>
        <title>Organization Charter - Improved</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <filterContext.Provider value={{
          filters: filters,
          setFilters: setFilters
        }}>
          <Filter handleReloadFilters={fetchNewData} uniqueValues={uniqueValues}/>
          {
            Object.keys(tribes).length ? <>
              <ViewData tribes={tribes} isLoading={isLoading} fetchNewData={fetchNewData}/>
            </> : <>
              <h1 className="mx-auto text-center text-4xl mt-16 px-8">
                No data to display.
              </h1>
              <h2 className="mx-auto text-center text-xl my-8 px-4 mb-16">
              Select a filter if you haven&apos;t, otherwise, no team member with the selected filters exist.
              </h2>
              <p className="text-center mx-auto bg-red-200 p-3 border rounded-xl">
                Did you want to see all employees?&nbsp;
                <button className="underline" onClick={_ => fetchNewData({
                    filters: initialFilter,
                    setFilters: undefined
                  })}>
                    Click me instead
                </button>
              </p>
            </>
          }
        </filterContext.Provider>
      </main>
    </>
  );
}

export async function getServerSideProps() {

  const teams = await prisma.team.findMany();
  const employees = (await prisma.employee.findMany({
    select: {
      name: true
    }
  })).map(e => e.name);

  if(!teams.length) {
    return {
      props: {
      }
    }
  }

  const allValues: {
    [key in keyof Team]: Set<(string)>
  } = {
    name: new Set(),
    team_lead: new Set(),
    domain: new Set(),
    domain_lead: new Set(),
    tribe: new Set(),
    tribe_lead: new Set(),
    tribe_area: new Set(),
    tribe_area_lead: new Set(),
    type: new Set()
  };

  // Add all values to the corresponding set
  teams.forEach(team => {
    // @ts-ignore
    Object.keys(team).forEach((key: string) => allValues[key as keyof Team].add(team[key as keyof Team]))
  })

  // Convert into array so it's JSON-izable
  const uniqueValues: {
    employees: string[]
  } & {
    [key in keyof Team]: (Array<string | null>)
  } = {
    employees,
    name: Array.from(allValues.name),
    team_lead: Array.from(allValues.team_lead),
    domain: Array.from(allValues.domain),
    domain_lead: Array.from(allValues.domain_lead),
    tribe: Array.from(allValues.tribe),
    tribe_lead: Array.from(allValues.tribe_lead),
    tribe_area: Array.from(allValues.tribe_area),
    tribe_area_lead: Array.from(allValues.tribe_area_lead),
    type: Array.from(allValues.type)
  }
  return {
    props: {
      uniqueValues
    }
  }
}