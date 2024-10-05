import { ClerkProvider } from "@clerk/clerk-react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, StrictMode, Suspense } from "react";

import { CLERK_PUBLISHABLE_KEY } from "../util/constants.ts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 24,
    },
  },
});

export const ReactProviders = ({
  children,
}: Readonly<PropsWithChildren>) => {
  return (
    <StrictMode>
      <Suspense>
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ClerkProvider>
      </Suspense>
    </StrictMode>
  );
};
