import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import map from "lodash/map";
import { twMerge } from "tailwind-merge";

const links = [
  {
    href: "/",
    label: "Skills",
  },
  {
    href: "/resume",
    label: "Resume",
  },
  {
    href: "/certifications",
    label: "Certifications",
  },
];

type NavigationProperties = {
  readonly currentPathname: string;
};

export function Navigation({ currentPathname }: NavigationProperties) {
  return (
    <Navbar className="mx-auto my-4 max-w-screen-xl rounded border-2">
      <NavbarContent justify="center">
        {map(links, (link) => {
          return (
            <NavbarItem>
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
