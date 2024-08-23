import { Link } from "@nextui-org/link";
import map from "lodash/map";

const links = [
  {
    href: "https://pro.academind.com/p/clean-code",
    label: "Clean Code",
  },
  {
    href: "https://pro.academind.com/p/javascript-datastructures-the-fundamentals",
    label: "JavaScript Data Structures",
  },
  {
    href: "https://pro.academind.com/p/javascript-algorithms-the-fundamentals",
    label: "JavaScript Algorithms",
  },
  {
    href: "https://pro.academind.com/p/javascript-the-tricky-parts",
    label: "JavaScript The Tricky Parts",
  },
  {
    href: "https://pro.academind.com/p/javascript-unit-testing-the-practical-guide",
    label: "JavaScript Unit Testing",
  },
  {
    href: "https://pro.academind.com/p/github-actions-the-complete-guide",
    label: "GitHub Actions",
  },
  {
    href: "https://pro.academind.com/p/nodejs-the-complete-guide-incl-mvc-rest-apis-graphql",
    label: "NodeJS",
  },
  {
    href: "https://pro.academind.com/p/deno-the-complete-introduction",
    label: "Deno",
  },
  {
    href: "https://pro.academind.com/p/mongodb-the-complete-developer-s-guide-2020",
    label: "Mongo",
  },
  {
    href: "https://pro.academind.com/p/sql-the-complete-guide-mysql-postgresql-more",
    label: "SQL",
  },
  {
    href: "https://pro.academind.com/p/react-the-complete-guide-course",
    label: "React",
  },
  {
    href: "https://pro.academind.com/p/react-typescript-the-practical-guide",
    label: "React & TypeScript",
  },
  {
    href: "https://pro.academind.com/p/react-nodejs-express-mongodb-the-mern-fullstack-guide",
    label: "MERN",
  },
  {
    href: "https://pro.academind.com/p/react-native-the-practical-guide-2022-new",
    label: "React Native",
  },
  {
    href: "https://pro.academind.com/p/ionic-react-build-cross-platform-apps-web-android-ios",
    label: "Ionic + React",
  },
  {
    href: "https://pro.academind.com/p/nextjs-react-the-complete-guide",
    label: "Next.js 14 & React",
  },
  {
    href: "https://pro.academind.com/p/remix-js-the-practical-guide",
    label: "Remix",
  },
  {
    href: "https://pro.academind.com/p/angular-the-complete-guide",
    label: "Angular",
  },
  {
    href: "https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition",
    label: "MEAN",
  },
  {
    href: "https://pro.academind.com/p/ionic-build-ios-android-web-apps-with-ionic-angular",
    label: "Ionic + Angular",
  },
  {
    href: "https://pro.academind.com/p/vue-3-the-complete-guide",
    label: "Vue",
  },
  {
    href: "https://pro.academind.com/p/nuxt-js-vue-js-on-steroids",
    label: "Nuxt",
  },
  {
    href: "https://pro.academind.com/p/svelte-js-the-complete-guide",
    label: "Svelte",
  },
  {
    href: "https://pro.academind.com/p/progressive-web-apps-pwa-the-complete-guide",
    label: "PWA",
  },
  {
    href: "https://pro.academind.com/p/docker-kubernetes-the-practical-guide",
    label: "Docker & Kubernetes",
  },
  {
    href: "https://pro.academind.com/p/aws-cloud-practitioner-clf-c01-complete-aws-introduction",
    label: "AWS Cloud Practitioner",
  },
  {
    href: "https://pro.academind.com/p/aws-serverless-apis-apps-a-complete-introduction",
    label: "AWS Serverless APIs & Apps",
  },
  {
    href: "https://pro.academind.com/p/go-the-complete-guide",
    label: "Go",
  },
  {
    href: "https://pro.academind.com/p/htmx-the-practical-guide",
    label: "HTMX",
  },
  {
    href: "https://pro.academind.com/p/flutter-the-complete-guide-2023",
    label: "Flutter & Dart",
  },
  {
    href: "https://pro.academind.com/p/python-the-practical-guide",
    label: "Python",
  },
  {
    href: "https://pro.academind.com/p/python-django-the-practical-guide",
    label: "Django",
  },
  {
    href: "https://pro.academind.com/p/microsoft-power-bi-the-practical-guide",
    label: "Microsoft Power BI",
  },
  {
    href: "https://pro.academind.com/p/tableau-desktop-2020-a-complete-introduction",
    label: "Tableau Desktop",
  },
];

export const AcademindCourses = () => {
  return (
    <div className="prose max-w-max text-foreground">
      <p>
        Academind has long been a great source for following along with
        projects for multiple frameworks. Which is an excellent way to get
        an
        introduction to all of a frameworks features.
      </p>
      <p>
        Academind has its own paid subscription, but most, if not all, the
        courses are also available on Udemy. I recommend these courses at a
        minimum, but take as many as you like:
      </p>
      <p>
        <Link
          isExternal
          href="https://academind.com/"
        >
          Academind
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
};
