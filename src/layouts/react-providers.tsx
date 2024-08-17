import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, StrictMode, Suspense } from "react";

export const queryClient = new QueryClient();

export function ReactProviders({ children }: Readonly<PropsWithChildren>) {
  return (
    <StrictMode>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  );
}
