import { Link } from "@nextui-org/link";
import map from "lodash/map";

const links = [
  {
    href: "https://www.algoexpert.io/interview-tips",
    label: "Interview Tips",
  },
  {
    href: "https://www.algoexpert.io/data-structures",
    label: "Data Structures Crash Course",
  },
  {
    href: "https://www.algoexpert.io/questions",
    label: "Coding Interview Questions",
  },
  {
    href: "https://www.algoexpert.io/assessments",
    label: "Coding Interview Assessments",
  },
];

export const AlgoExpertCourses = () => {
  return (
    <div className="prose max-w-max text-foreground">
      <p>
        AlgoExpert is a great way to learn complex algorithms, the site
        includes video explanations and walkthroughs for every problem. This
        gets seriously difficult very quickly. But it's worth getting through.
      </p>
      <p>
        This does NOT include other AlgoExpert products like SystemsExpert,
        Frontend Expert, etc.
      </p>
      <p>
        <Link
          isExternal
          href="https://www.algoexpert.io/product"
        >
          AlgoExpert
        </Link
        >
      </p>
      <ul className="list-decimal">
        {map(links, (link) => {
          return (
            <li>
              <Link
                isExternal
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
