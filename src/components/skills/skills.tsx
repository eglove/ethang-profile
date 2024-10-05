import { Spinner } from "@nextui-org/spinner";
import fromPairs from "lodash/fromPairs";
import map from "lodash/map";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/toPairs";
import useSWR from "swr";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { fetcher } from "../../util/fetcher.ts";
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
  const { data, isLoading } = useSWR<{
    max: number;
    skills: Record<string, number>;
  }>("https://staging-ethang-api-izt2.encr.app/jobs/experience", fetcher);

  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold">
        Years Experience
      </h1>
      {isLoading && <Spinner className="mx-auto my-4 w-full" />}
      {!isLoading && (
        <div className="mx-auto grid place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {map(fromPairs(reverse(sortBy(toPairs(data?.skills), 1))),
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
