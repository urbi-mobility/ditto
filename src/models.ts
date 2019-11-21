export type ValidationFormData = {
  nonce: string;
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string;
  birthCountry: string;
  birthProvince: string;
  birthLocality: string;
  residenceAddress: Address;
  billingAddress: Address;
  phoneNumber: string;
  drivingLicense: DrivingLicense;
};

export type DrivingLicense = {
  number: string;
  category: string;
  issuer: string;
  issueCountry: string;
  issueLocality: string;
  issueDate: Date;
  expiryDate: Date;
};

export type Address = {
  address: string;
  zip: string;
  city: string;
  country: string;
};

export const emptyValidationFormData: ValidationFormData = {
  nonce: "",
  firstName: "",
  lastName: "",
  nationality: "",
  birthDate: new Date().toISOString(),
  birthCountry: "",
  birthProvince: "",
  birthLocality: "",
  phoneNumber: "",
  residenceAddress: {
    address: "",
    zip: "",
    city: "",
    country: ""
  },
  billingAddress: {
    address: "",
    zip: "",
    city: "",
    country: ""
  },
  drivingLicense: {
    number: "",
    category: "",
    issuer: "",
    issueCountry: "",
    issueLocality: "",
    issueDate: new Date(),
    expiryDate: new Date()
  }
};
