import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import map from "lodash/map";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { queryFunctions } from "../../query/query-functions.ts";
import { SkillGauge } from "../common/skill-gauge.tsx";

export const Skills = ({
  currentPathname,
}: MainLayoutProperties) => {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <SkillsWithProviders />
    </MainLayout>
  );
};

const SkillsWithProviders = () => {
  const { data, isLoading } = useQuery(queryFunctions.experience());

  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold">
        Years Experience
      </h1>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
      {isLoading && <Spinner className="mx-auto my-4 w-full" />}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
      {!isLoading && (
        <div className="mx-auto grid place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {map(data?.skills,
            (years, label) => {
              return (
                <SkillGauge
                  key={label}
                  label={label}
                  maxYears={data?.max ?? 0}
                  years={Number(years.toFixed(2))}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
