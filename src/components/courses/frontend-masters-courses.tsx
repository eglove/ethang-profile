import { Link } from "@nextui-org/link";
import map from "lodash/map";

const links = [
  {
    href: "https://frontendmasters.com/learn/beginner/",
    label: "Beginner Path",
  },
  {
    href: "https://frontendmasters.com/learn/professional/",
    label: "Professional Path",
  },
  {
    href: "https://frontendmasters.com/learn/advanced/",
    label: "Expert Path",
  },
  {
    href: "https://frontendmasters.com/learn/javascript/",
    label: "JavaScript Path",
  },
  {
    href: "https://frontendmasters.com/learn/browser-apis/",
    label: "Browser APIs Path",
  },
];

export function FrontendMastersCourses() {
  return (
    <div className="prose max-w-max text-foreground">
      <p>
        Frontend Masters has world-class instructors leading lecture style
        workshops on just about everything.
      </p>
      <p>
        I recommend simply just following the learning paths, even the
        beginner and professional paths that will feel below your skill level
        at this point. There is still a lot of good to pick up. However, I
        would avoid the framework courses (React/Angular/Vue). Frontend
        Masters and its community is notably anti-framework. This isn't the
        place you want to learn about industry tooling. But their deep dives
        into vanilla tech will make you a better user of frameworks.
      </p>
      <p>
        <Link
          isExternal
          href="https://frontendmasters.com/learn/"
        >
          Frontend Masters
        </Link>
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
}
