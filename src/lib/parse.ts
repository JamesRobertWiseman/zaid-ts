import { Citizenship, Gender, IDInfo } from "../types";

import { readBirthDate } from "./date";
import { isValid } from "./valid";

const GENDER_START = 6;
const GENDER_END = 10;
const MALE_SEQUENCE_START = 5000;
const CITIZENSHIP_INDEX = 10;
const INVALID_ID_MESSAGE = "Invalid ID number";

const requireValidId = (id: string): void => {
  if (!isValid(id)) {
    throw new Error(INVALID_ID_MESSAGE);
  }
};

const readGender = (id: string): Gender =>
  Number(id.slice(GENDER_START, GENDER_END)) >= MALE_SEQUENCE_START
    ? Gender.MALE
    : Gender.FEMALE;

const readCitizenship = (id: string): Citizenship => {
  const citizenshipCode = Number(id[CITIZENSHIP_INDEX]);

  if (citizenshipCode === 0) {
    return Citizenship.CITIZEN;
  }

  if (citizenshipCode === 1) {
    return Citizenship.RESIDENT;
  }

  return Citizenship.REFUGEE;
};

export const getDateOfBirth = (id: string): Date => {
  requireValidId(id);

  const dateOfBirth = readBirthDate(id);
  if (!dateOfBirth) {
    throw new Error(INVALID_ID_MESSAGE);
  }

  return dateOfBirth;
};

export const getGender = (id: string): Gender => {
  requireValidId(id);
  return readGender(id);
};

export const getCitizenship = (id: string): Citizenship => {
  requireValidId(id);
  return readCitizenship(id);
};

export const parse = (id: string): IDInfo => {
  requireValidId(id);

  const dateOfBirth = readBirthDate(id);
  if (!dateOfBirth) {
    throw new Error(INVALID_ID_MESSAGE);
  }

  return {
    dateOfBirth,
    gender: readGender(id),
    citizenship: readCitizenship(id),
  };
};

export const getAge = (id: string): number => {
  const dateOfBirth = getDateOfBirth(id);
  const currentDate = new Date();
  let age = currentDate.getUTCFullYear() - dateOfBirth.getUTCFullYear();
  const monthDifference = currentDate.getUTCMonth() - dateOfBirth.getUTCMonth();
  const beforeBirthday =
    monthDifference < 0 ||
    (monthDifference === 0 &&
      currentDate.getUTCDate() < dateOfBirth.getUTCDate());

  if (beforeBirthday) {
    age -= 1;
  }

  return age;
};
