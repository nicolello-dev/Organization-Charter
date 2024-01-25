import { filterContext, filterContextType } from "@/pages";
import React, { useContext, useEffect } from "react";
import Select, { createFilter } from "react-select";

import type { Filter } from "@/types/common/filters";
import { Team } from "@prisma/client";
import { nonSelectedString } from "@/constants/constants";

function keyofTeam2filterContext(
  key: keyof Team & "employees",
): keyof filterContextType["filters"] | string {
  console.log("Here!", key);
  switch (key) {
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
      return key;
  }
}

function prettify(str: string) {
  switch (str) {
    case "employees":
      return "Team member";
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
      color: "#000000",
    },
    {
      name: "Product Offering",
      color: "#76909b",
    },
    {
      name: "Global",
      color: "#c57c9f",
    },
    {
      name: "Regional Business",
      color: "#0097a6",
    },
  ];

  return (
    <div className="my-6 flex flex-row gap-4">
      Legend:
      {colors.map((color, i) => {
        return (
          <div key={i} className="flex flex-row items-center gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: color.color }}
            ></div>
            <p>{color.name}</p>
          </div>
        );
      })}
    </div>
  );
}

let firstLoad = true;

export default function Filters({
  handleReloadFilters,
  uniqueValues,
}: {
  handleReloadFilters: (filtersCtx: filterContextType) => void;
  uniqueValues: { [key in keyof Team]: (string | null)[] | undefined };
}) {
  const selectFilters = createFilter({
    ignoreAccents: true,
    ignoreCase: true,
    matchFrom: "any",
  });

  // Exclude empty values
  Object.keys(uniqueValues).forEach((key) => {
    uniqueValues[key as keyof Team] = uniqueValues[key as keyof Team]?.filter(
      (v) => ![undefined, null, ""].includes(v),
    );
  });

  const filtersctx = useContext(filterContext);

  function handleFilterChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    filterName: keyof Team & "employees",
  ) {
    const newValue = e.target.value;
    if (!filtersctx.setFilters) {
      return;
    }
    filtersctx.setFilters((prev: Filter) => {
      return {
        ...prev,
        [keyofTeam2filterContext(filterName)]:
          newValue == nonSelectedString ? "" : newValue,
      };
    });
  }

  useEffect(() => {
    !firstLoad && handleReloadFilters(filtersctx);
    firstLoad = false;
  }, [filtersctx.filters]);

  return (
    <>
      <h1 className="m-6 text-xl">Filters:</h1>
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {Object.keys(uniqueValues).map((filter, i) => {
          // Exclude the type filter since it's not used in the filter API
          if (filter == "type") {
            return;
          }
          const options = uniqueValues[filter as keyof Team]
            ?.sort()
            .map((value) => {
              return { value, label: value };
            });
          options?.unshift({
            value: nonSelectedString,
            label: nonSelectedString,
          });
          return (
            <div
              key={i}
              className="m-1 rounded-xl border border-gray-200 p-2 text-center"
            >
              <p className="m-2">{prettify(filter)}:</p>
              <Select
                className="min-w-[150px]"
                filterOption={selectFilters}
                onChange={(e: any) =>
                  handleFilterChange(
                    {
                      target: e,
                    } as React.ChangeEvent<HTMLSelectElement>,
                    filter as keyof Team & "employee",
                  )
                }
                defaultValue={nonSelectedString}
                // @ts-ignore
                options={options}
              ></Select>
            </div>
          );
        })}
      </div>
      <Legend />
    </>
  );
}
