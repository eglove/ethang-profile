import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Avatar, NavbarBrand, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { NavigationItems } from "./navigation-items.tsx";


type NavigationProperties = {
  readonly currentPathname: string;
};

// eslint-disable-next-line max-lines-per-function
export function Navigation({ currentPathname }: NavigationProperties) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if ("undefined" === typeof window) {
      return;
    }

    // eslint-disable-next-line react/hooks-extra/no-direct-set-state-in-use-effect
    setIsLocal("localhost" === location.hostname);
  }, []);

  return (
    <Navbar
      className="mx-auto max-w-screen-xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen
            ? "Close menu"
            : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="text-xl font-bold">
          Ethan Glover
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex"
        justify="center"
      >
        <NavigationItems currentPathname={currentPathname} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link
            isExternal
            href="https://github.com/eglove"
          >
            <Avatar
              isBordered
              color="primary"
              name="GitHub"
              src="/images/github.svg"
            />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            isExternal
            href="https://www.linkedin.com/in/ethan-glover/"
          >
            <Avatar
              isBordered
              color="secondary"
              name="LinkedIn"
              src="/images/linkedin.svg"
            />
          </Link>
        </NavbarItem>
        {isLocal && (
          <NavbarItem>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="z-40">
        <NavigationItems currentPathname={currentPathname} />
      </NavbarMenu>
    </Navbar>
  );
}
