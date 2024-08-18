import type { PropsWithChildren } from "react";

import { Navigation } from "../components/navigation/navigation.tsx";
import { ReactProviders, type ReactProvidersProperties } from "./react-providers.tsx";

export type MainLayoutProperties = {
  readonly currentPathname: string;
} & ReactProvidersProperties & Readonly<PropsWithChildren>;

export function MainLayout({
  children, clerkKey, currentPathname,
}: MainLayoutProperties) {
  return (
    <ReactProviders clerkKey={clerkKey}>
      <Navigation currentPathname={currentPathname} />
      <main className="mx-auto my-4 max-w-screen-xl">
        {children}
      </main>
    </ReactProviders>
  );
}
