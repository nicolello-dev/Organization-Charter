import Head from "next/head";

import { createContext, useEffect, useState } from "react";

import Filter from "@/components/filter"
import ViewData from "@/components/viewData";

import type { Filter as Filters } from "@/types/common/filters";

type filterContextType = {
    filters: Filters | undefined,
    setFilters: React.Dispatch<React.SetStateAction<Filters>> | undefined
}

export const filterContext = createContext<filterContextType>({
  filters: undefined,
  setFilters: undefined
});

const initialFilter: Filters = {
    name: ""
}

export default function Home() {

  const [filters, setFilters] = useState<Filters>(initialFilter);

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
          setFilters: setFilters
        }}>
          <Filter/>
            <p className="text-red">Test testing</p>
          <ViewData/>
        </filterContext.Provider>
      </main>
    </>
  );
}