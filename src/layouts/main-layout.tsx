import type { PropsWithChildren } from "react";

import { Navigation } from "../components/navigation/navigation.tsx";
import { ReactProviders } from "./react-providers.tsx";

export type MainLayoutProperties = {
  readonly currentPathname: string;
} & Readonly<PropsWithChildren>;

export function MainLayout({
  children, currentPathname,
}: MainLayoutProperties) {
  return (
    <ReactProviders>
      <Navigation currentPathname={currentPathname} />
      <main className="mx-auto my-4 max-w-screen-xl">
        {children}
      </main>
    </ReactProviders>
  );
}
