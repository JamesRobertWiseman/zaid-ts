import { Citizenship, Gender, IDInfo } from "../types";

import { isValid } from "./valid";

/**
 * Get date of birth from a South African ID number.
 * @param id The ID number to get the date of birth from.
 * @returns A Date object representing the date of birth.
 * @throws An error if the ID number is invalid.
 */
export const getDateOfBirth = (id: string): Date => {
  if (!isValid(id)) {
    throw new Error("Invalid ID number");
  }
  const idArray = id.split("").map(Number);
  const year = parseInt(idArray.slice(0, 2).join(""));
  const month = parseInt(idArray.slice(2, 4).join(""));
  const day = parseInt(idArray.slice(4, 6).join(""));
  const fullYear = year >= 0 && year <= 21 ? 2000 + year : 1900 + year;
  return new Date(`${fullYear}-${month}-${day}`);
};

/**
 * Get gender from a South African ID number.
 * @params id The ID number to get the gender from.
 * @returns a string representing the gender
 * @throws An error if the ID number is invalid.
 */

export const getGender = (id: string): Gender => {
  if (!isValid(id)) {
    throw new Error("Invalid ID number");
  }

  const idArray = id.split("").map(Number);
  const genderCode = parseInt(idArray.slice(6, 10).join(""));
  return genderCode > 5000 ? Gender.MALE : Gender.FEMALE;
};

/**
 * Get citizenship from a South African ID number.
 * @params id The ID number to get the citizenship from (either 0 or 1).
`* @returns A string representing the citizenship.
 */

export const getCitizenship = (id: string): Citizenship => {
  if (!isValid(id)) {
    throw new Error("Invalid ID number");
  }

  const idArray = id.split("").map(Number);
  const citizenshipCode = idArray[10];
  return citizenshipCode === 0 ? Citizenship.CITIZEN : Citizenship.RESIDENT;
};

/**
 * Parse a South African ID number and return all information
 * @params id The ID number to parse.
 * @response A JSON object with the following properties:
 * - dateOfBirth: Date of birth
 * - gender: Gender
 * - citizenship: Citizenship
 * @throws An error if the ID number is invalid.
 */

export const parse = (id: string): IDInfo => {
  if (!isValid(id)) {
    throw new Error("Invalid ID number");
  }
  const dateOfBirth = getDateOfBirth(id);
  const gender = getGender(id);
  const citizenship = getCitizenship(id);
  return {
    dateOfBirth,
    gender,
    citizenship,
  };
};

/**
 * Get age from a South African ID number.
 * @params id The ID number to get the age from.
 * @returns A number representing the age.
 * @throws An error if the ID number is invalid.
 */

export const getAge = (id: string): number => {
  if (!isValid(id)) {
    throw new Error("Invalid ID number");
  }
  const dateOfBirth = getDateOfBirth(id);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
