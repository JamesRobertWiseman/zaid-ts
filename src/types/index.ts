export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum Citizenship {
  CITIZEN = "SA citizen",
  RESIDENT = "Permanent resident",
  REFUGEE = "Refugee",
}

export interface ValidationObject {
  validLength: boolean;
  validDate: boolean;
  validCitizenshipCode: boolean;
  validSecondLastDigit: boolean;
  validChecksum: boolean;
}

export interface IDInfo {
  dateOfBirth: Date;
  gender: "male" | "female";
  citizenship: "SA citizen" | "Permanent resident" | "Refugee";
}
