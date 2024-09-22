import { Store } from "@ethang/store";
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

export const certificationFormStore = new Store(initialState);

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
  certificationFormStore.set((state) => {
    state.description = data.description;
    state.expires = isNil(data.expires)
      ? ""
      : DateTime.fromISO(data.expires).toFormat(dateInputFormat);
    state.id = data.id;
    state.issuedBy = data.issuedBy;
    state.issuedOn = DateTime.fromISO(data.issuedOn).toFormat(dateInputFormat);
    state.name = data.name;
    state.url = data.url;
  });
};
