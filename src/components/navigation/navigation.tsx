import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";

import { NavigationItems } from "./navigation-items.tsx";


type NavigationProperties = {
  readonly currentPathname: string;
};

export function Navigation({ currentPathname }: NavigationProperties) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex"
        justify="center"
      >
        <NavigationItems currentPathname={currentPathname} />
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
      <NavbarMenu className="z-40">
        <NavigationItems currentPathname={currentPathname} />
      </NavbarMenu>
    </Navbar>
  );
}
