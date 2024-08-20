import { Link } from "@nextui-org/link";
import map from "lodash/map";

const profileLinks = [
  {
    href: "https://frontendmasters.com/u/ethang/",
    label: "Frontend Masters",
  },
  {
    href: "https://www.credly.com/users/ethan-glover.341d99c5",
    label: "Credly (Verified Certifications)",
  },
  {
    href: "https://www.udemy.com/user/ethanglover/",
    label: "Udemy",
  },
  {
    href: "https://www.apollographql.com/tutorials/dashboard/certifications",
    label: "Apollo Odyssey",
  },
];


export function LearningProfileLinks() {
  return (
    <div className="prose text-foreground">
      <h2 className="my-1 text-xl text-foreground">
        Learning Profiles:
      </h2>
      <div className="flex flex-wrap gap-4">
        {map(profileLinks, (link) => {
          return (
            <Link
              isExternal
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
