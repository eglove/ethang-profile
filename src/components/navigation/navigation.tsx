import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useObservable } from "@legendapp/state/react";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Avatar, NavbarBrand, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";

import { NavigationItems } from "./navigation-items.tsx";

type NavigationProperties = {
  readonly currentPathname: string;
};

export const Navigation = (
  { currentPathname }: NavigationProperties,
) => {
  const isMenuOpen = useObservable(false);

  // eslint-disable-next-line unicorn/prefer-global-this
  const isLocal = "undefined" === typeof window
    ? false
    : "localhost" === location.hostname;

  return (
    <Navbar
      onMenuOpenChange={() => {
        isMenuOpen.set(!isMenuOpen.get());
      }}
      className="mx-auto max-w-screen-xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen.get()
            ? "Close Menu"
            : "Open Menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="hidden text-xl font-bold sm:block">
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
        <NavbarItem
          isExternal
          as={Link}
          href="https://github.com/eglove"
        >
          <Avatar
            isBordered
            color="primary"
            name="GitHub"
            size="sm"
            src="/images/github.svg"
          />
        </NavbarItem>
        <NavbarItem
          isExternal
          as={Link}
          href="https://www.linkedin.com/in/ethan-glover/"
        >
          <Avatar
            isBordered
            color="secondary"
            name="LinkedIn"
            size="sm"
            src="/images/linkedin.svg"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="z-40">
        <NavbarItem className="text-xl font-bold">
          Ethan Glover
        </NavbarItem>
        <NavigationItems currentPathname={currentPathname} />
      </NavbarMenu>
    </Navbar>
  );
};
