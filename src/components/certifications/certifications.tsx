import { Link } from "@nextui-org/link";
import map from "lodash/map";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";

const profileLinks = [
  {
    href: "https://frontendmasters.com/u/ethang/",
    label: "Frontend Masters",
  },
  {
    href: "https://www.credly.com/users/ethan-glover.341d99c5",
    label: "Credly (Verified Certifications)",
  },
  {
    href: "https://www.udemy.com/user/ethanglover/",
    label: "Udemy",
  },
  {
    href: "https://www.apollographql.com/tutorials/dashboard/certifications",
    label: "Apollo Odyssey",
  },
];

export function CertificationsLayout({
  clerkKey, currentPathname,
}: MainLayoutProperties) {
  return (
    <MainLayout
      clerkKey={clerkKey}
      currentPathname={currentPathname}
    >
      <div className="prose text-foreground">
        <h2 className="text-2xl text-foreground">
          Learning Profiles:
        </h2>
        <ul>
          {map(profileLinks, (link) => {
            return (
              <li>
                <Link
                  isExternal
                  color="foreground"
                  href={link.href}
                  key={link.href}
                  underline="always"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </MainLayout>
  );
}
