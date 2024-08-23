import { ModalHeader } from "@nextui-org/modal";

type JobUpdateModalHeaderProperties = {
  readonly company: string;
  readonly title: string;
};

export const JobUpdateModalHeader = ({
  company, title,
}: JobUpdateModalHeaderProperties) => {
  return (
    <ModalHeader>
      {title}
      ,
      {" "}
      {company}
    </ModalHeader>
  );
};
