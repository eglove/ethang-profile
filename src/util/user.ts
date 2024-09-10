import { useUser } from "@clerk/clerk-react";

// eslint-disable-next-line cspell/spellchecker
export const userId = "user_2iZVg2Ra7qpZNZ2WiA6mpFaCwys";

export const useIsMe = () => {
  const user = useUser();

  return true === user.isSignedIn && user.user.id === userId;
};
