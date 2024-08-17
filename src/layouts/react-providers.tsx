import {type PropsWithChildren, StrictMode} from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export const queryClient = new QueryClient();

export function ReactLayout({children}: PropsWithChildren) {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </StrictMode>
    )
}