import { Link } from "@nextui-org/link";

export function StyledLink(properties: Readonly<Parameters<typeof Link>[0]>) {
  return (
    <Link
      isExternal
      color="foreground"
      underline="always"
      {...properties}
    />
  );
}
