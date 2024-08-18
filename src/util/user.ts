import { useUser } from "@clerk/clerk-react";

export const userId = "user_2iZVg2Ra7qpZNZ2WiA6mpFaCwys";

export function useIsMe() {
  const user = useUser();

  return true === user.isSignedIn && user.user.id === userId;
}
