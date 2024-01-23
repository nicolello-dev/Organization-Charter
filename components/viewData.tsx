import { filterContext } from "@/pages";

import { useContext, useEffect } from "react";

import type { filterContextType } from "@/pages/index";

import Tribe from "@/components/tribe";

import type { EmployeeWithTeam } from "@/types/common/employees";

export default function ViewData({
  tribes,
  isLoading,
  fetchNewData,
}: {
  tribes: Record<string, EmployeeWithTeam[]>;
  isLoading: boolean;
  fetchNewData: (filtersCtx: filterContextType) => void;
}) {
  const filtersCtx = useContext(filterContext);

  useEffect(() => {
    fetchNewData(filtersCtx);
  }, [filtersCtx.filters?.name]);

  if (isLoading) {
    return <h1 className="text-xl">Loading...</h1>;
  }

  return (
    <>
      {Object.keys(tribes).map((tribeName, i) => {
        const tribeEmployees = tribes[tribeName];
        if (!tribeEmployees) {
          return null;
        }
        return (
          <Tribe key={i} tribeName={tribeName} employees={tribeEmployees} />
        );
      })}
    </>
  );
}
