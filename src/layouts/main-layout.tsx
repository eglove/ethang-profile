import type { PropsWithChildren } from "react";

import { Navigation } from "../components/navigation/navigation.tsx";
import { ReactProviders, type ReactProvidersProperties } from "./react-providers.tsx";

export function MainLayout({
  children, clerkKey,
}: ReactProvidersProperties & Readonly<PropsWithChildren>) {
  return (
    <ReactProviders clerkKey={clerkKey}>
      <Navigation />
      <main className="mx-auto my-4 max-w-screen-xl">
        {children}
      </main>
    </ReactProviders>
  );
}
