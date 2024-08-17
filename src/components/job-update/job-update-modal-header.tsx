import { ModalHeader } from "@nextui-org/modal";

type JobUpdateModalHeaderProperties = {
  readonly company: string;
  readonly title: string;
};

export function JobUpdateModalHeader({
  company, title,
}: JobUpdateModalHeaderProperties) {
  return (
    <ModalHeader>
      {title}
      ,
      {" "}
      {company}
    </ModalHeader>
  );
}
