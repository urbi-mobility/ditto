import { parseISO } from "date-fns";
import { ValidationFormData } from "src/models";

export const serialize = (obj: any) => {
  let serialized: any = {};
  Object.keys(obj)
    .sort()
    .forEach(k => {
      const v = obj[k];
      if (v !== null && v !== undefined) {
        if (Object.prototype.toString.call(v) === "[object Date]") {
          serialized[k] = v.toISOString();
        } else if (!Array.isArray(v) && typeof v === "object") {
          serialized[k] = serialize(v);
        } else {
          serialized[k] = v;
        }
      }
    });
  return serialized;
};

export const serializeToJson = (obj: any) => JSON.stringify(serialize(obj));

const parseSerializedDate = (date: Date) => {
  const asString =
    typeof date === "string" ? ((date as unknown) as string) : "";
  return asString ? parseISO(asString) : date;
};

export const deserializeUserData = (json: string) => {
  const deserialized = JSON.parse(json) as ValidationFormData;

  const { birthDate, drivingLicense } = deserialized;
  const { expiryDate, issueDate } = drivingLicense;

  deserialized.birthDate = parseSerializedDate(birthDate);
  deserialized.drivingLicense.expiryDate = parseSerializedDate(expiryDate);
  deserialized.drivingLicense.issueDate = parseSerializedDate(issueDate);

  return deserialized;
};
