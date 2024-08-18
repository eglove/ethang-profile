import { ClerkProvider } from "@clerk/clerk-react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, StrictMode, Suspense } from "react";

export const queryClient = new QueryClient();

export type ReactProvidersProperties = {
  readonly clerkKey: string;
};

export function ReactProviders({
  children, clerkKey,
}: ReactProvidersProperties & Readonly<PropsWithChildren>) {
  return (
    <StrictMode>
      <Suspense>
        <ClerkProvider publishableKey={clerkKey}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ClerkProvider>
      </Suspense>
    </StrictMode>
  );
}
