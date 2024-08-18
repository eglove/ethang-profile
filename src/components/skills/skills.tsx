import map from "lodash/map";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { SkillGauge } from "../common/skill-gauge.tsx";

type SkillsProperties = {
  readonly experiences: Record<string, number>;
  readonly max: number;
};

export function Skills({
  currentPathname,
  experiences,
  max,
}: MainLayoutProperties & SkillsProperties) {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <SkillsWithProviders
        experiences={experiences}
        max={max}
      />
    </MainLayout>
  );
}

function SkillsWithProviders({ experiences, max }: SkillsProperties) {
  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold">
        Years Experience
      </h1>
      <div className="mx-auto grid place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {map(experiences, (years, label) => {
          return (
            <SkillGauge
              key={label}
              label={label}
              maxYears={max}
              years={Number(years.toFixed(2))}
            />
          );
        })}
      </div>
    </div>
  );
}
