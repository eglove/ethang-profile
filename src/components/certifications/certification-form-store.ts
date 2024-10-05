import { observable } from "@legendapp/state";
import isNil from "lodash/isNil";
import { DateTime } from "luxon";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { americaChicago, dateInputFormat } from "../../constants/constants.ts";

const initialState = {
  description: "",
  expires: "",
  id: undefined as string | undefined,
  issuedBy: "",
  issuedOn: "",
  name: "",
  url: "",
};

export const certificationStore = observable(initialState);

export const resetCertificationStore = () => {
  certificationStore.set(initialState);
};

export const serializeCertificationsForPost = (
  state: typeof initialState,
) => {
  return {
    ...state,
    expires: DateTime
      .fromFormat(state.expires, dateInputFormat, { zone: americaChicago })
      .toISO(),
    issuedOn: DateTime
      .fromFormat(state.issuedOn, dateInputFormat, { zone: americaChicago })
      .toISO(),
    updatedAt: DateTime.now().toISO(),
  };
};

export const serializeCertificationDataForForm = (
  data: GetCertificationsJson[0],
) => {
  certificationStore.set({
    description: data.description,
    expires: isNil(data.expires)
      ? ""
      : DateTime.fromISO(data.expires).toFormat(dateInputFormat),
    id: data.id,
    issuedBy: data.issuedBy,
    issuedOn: DateTime.fromISO(data.issuedOn).toFormat(dateInputFormat),
    name: data.name,
    url: data.url,
  });
};
