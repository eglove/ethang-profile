import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";
import map from "lodash/map";
import { twMerge } from "tailwind-merge";

const links = [
  {
    href: "/",
    label: "Skills",
  },
  {
    href: "/resume/",
    label: "Resume",
  },
  {
    href: "/certifications/",
    label: "Certifications",
  },
  {
    href: "/projects/",
    label: "Projects",
  },
  {
    href: "/courses/",
    label: "Courses",
  },
];

type NavigationItemsProperties = {
  readonly currentPathname: string;
};


export function NavigationItems({
  currentPathname,
}: NavigationItemsProperties) {
  return (
    <>
      {map(links, (link) => {
        return (
          <NavbarItem key={link.href}>
            <Link
              className={twMerge(
                "text-foreground underline-offset-2",
                currentPathname === link.href && "underline",
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarItem>
        );
      })}
    </>
  );
}
