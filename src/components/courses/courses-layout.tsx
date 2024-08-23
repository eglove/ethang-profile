import { Accordion, AccordionItem } from "@nextui-org/react";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { AcademindCourses } from "./academind-courses.tsx";
import { AlgoExpertCourses } from "./algo-expert-courses.tsx";
import { BeginnerCourses } from "./beginner-courses.tsx";
import { CoursesSummary } from "./courses-summary.tsx";
import { FrontendMastersCourses } from "./frontend-masters-courses.tsx";
import { Reading } from "./reading.tsx";

export const CoursesLayout = ({ currentPathname }: MainLayoutProperties) => {
  return (
    <MainLayout currentPathname={currentPathname}>
      <CoursesLayoutWithProviders />
    </MainLayout>
  );
};

const CoursesLayoutWithProviders = () => {
  return (
    <div>
      <h1 className="my-4 text-3xl font-bold">
        Recommended Courses
      </h1>
      <CoursesSummary />
      <Accordion
        className="mt-4"
        variant="splitted"
      >
        <AccordionItem title="Beginner: Colte Steele">
          <BeginnerCourses />
        </AccordionItem>
        <AccordionItem title="Learn to Build: Academind">
          <AcademindCourses />
        </AccordionItem>
        <AccordionItem title="Learn the Web: Frontend Masters">
          <FrontendMastersCourses />
        </AccordionItem>
        <AccordionItem title="Learn Algorithms: AlgoExpert">
          <AlgoExpertCourses />
        </AccordionItem>
        <AccordionItem title="Reading">
          <Reading />
        </AccordionItem>
      </Accordion>
    </div>
  );
};
