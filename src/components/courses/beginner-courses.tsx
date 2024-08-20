import { Link } from "@nextui-org/link";
import map from "lodash/map";

const links = [
  {
    href: "https://www.udemy.com/course/html-and-css-bootcamp/learn/",
    label: "The HTML & CSS Bootcamp",
  },
  {
    href: "https://www.udemy.com/course/the-web-developer-bootcamp/learn/",
    label: "The Web Developer Bootcamp",
  },
  {
    href: "https://www.udemy.com/course/git-and-github-bootcamp/",
    label: "The Git & GitHub Bootcamp",
  },
  {
    href: "https://www.udemy.com/course/the-linux-command-line-bootcamp/",
    label: "The Linux Command Line Bootcamp",
  },
  {
    href: "https://www.udemy.com/course/pro-javascript/",
    label: "JavaScript Pro: Mastering Advanced Concepts and Techniques",
  },
  {
    href: "https://www.udemy.com/course/learn-typescript/",
    label: "Mastering TypeScript",
  },
];

export function BeginnerCourses() {
  return (
    <div className="prose max-w-max text-foreground">
      <p>
        I believe Colt Steele is the most beginner-friendly instructor out
        there. He's interesting, knowledgeable, and approaches topics in an
        easy-to-digest way. Colt Steele has brought his developer bootcamp
        to
        Udemy and continues to update it every year with modern technology.
      </p>
      <p>
        <Link
          isExternal
          href="https://www.udemy.com/user/coltsteele/"
        >
          Colt Steele courses
        </Link>
      </p>
      <p>
        Take as many of his courses as you like, but at a minimum, I highly
        recommend taking these:
      </p>
      <ul className="list-decimal">
        {map(links, (link) => {
          return (
            <li key={link.href}>
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
