import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { useIsMe } from "../../util/user.ts";
import { CertificationsTable } from "./certifications-table.tsx";
import { CreateCertification } from "./create-certification.tsx";
import { LearningProfileLinks } from "./learning-profile-links.tsx";


export function CertificationsLayout({
  clerkKey, currentPathname,
}: MainLayoutProperties) {
  return (
    <MainLayout
      clerkKey={clerkKey}
      currentPathname={currentPathname}
    >
      <CertificationCreateWithProviders />
    </MainLayout>
  );
}

function CertificationCreateWithProviders() {
  const isMe = useIsMe();

  return (
    <>
      <LearningProfileLinks />
      <CertificationsTable />
      {isMe && <CreateCertification />}
    </>
  );
}
