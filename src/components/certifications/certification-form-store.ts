import { Store } from "@tanstack/react-store";
import { DateTime } from "luxon";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { americaChicago, dateInputFormat } from "../../constants/constants.ts";

const initialState = {
  description: "",
  expires: "",
  issuedBy: "",
  issuedOn: "",
  name: "",
  url: "",
};

export const certificationFormStore = new Store(initialState);

export function resetCertificationStore() {
  certificationFormStore.setState(() => {
    return initialState;
  });
}

export const handleSetCertificationStoreValue = (
  key: keyof typeof certificationFormStore.state,
) => {
  return (value: string) => {
    certificationFormStore.setState((previous) => {
      return {
        ...previous,
        [key]: value,
      };
    });
  };
};

export function serializeCertificationsForPost(
  state: typeof certificationFormStore.state,
) {
  return {
    ...state,
    expires: DateTime
      .fromFormat(state.expires, dateInputFormat, { zone: americaChicago })
      .toISO(),
    issuedOn: DateTime
      .fromFormat(state.issuedOn, dateInputFormat, { zone: americaChicago })
      .toISO(),
  };
}

export function serializeCertificationDataForForm(
  data: GetCertificationsJson[0],
) {
  certificationFormStore.setState(() => {
    return {
      description: data.description,
      expires: DateTime.fromISO(data.expires).toFormat(dateInputFormat),
      id: data.id,
      issuedBy: data.issuedBy,
      issuedOn: DateTime.fromISO(data.issuedOn).toFormat(dateInputFormat),
      name: data.name,
      url: data.url,
    };
  });
}
