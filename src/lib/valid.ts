import { ValidationObject } from "types";

/**
 * Validates a South African ID number.
 * @param id The ID number to validate.
 * @returns An object with each validation step as a key and a boolean as a value.
 */
export const validate = (id: string): ValidationObject => {
  // convert string to array of numbers
  const idArray = id.split("").map(Number);

  // check it is only digits and exactly 13 digits long
  const validLength = idArray.length === 13 && !idArray.some(isNaN);

  // Extract and validate date parts
  const [yearStr, monthStr, dayStr] = [
    idArray.slice(0, 2).join(""),
    idArray.slice(2, 4).join(""),
    idArray.slice(4, 6).join(""),
  ];

  // Parse and validate numbers
  const [y, m, d] = [yearStr, monthStr, dayStr].map((x) => parseInt(x));
  let validDate = !isNaN(y) && !isNaN(m) && !isNaN(d);

  if (validDate) {
    // Basic range validation
    if (m < 1 || m > 12 || d < 1 || d > 31) {
      validDate = false;
    } else {
      const fullYear = y + (y <= 21 ? 2000 : 1900);
      const date = new Date(fullYear, m - 1, d);
      validDate =
        date.getFullYear() === fullYear &&
        date.getMonth() + 1 === m &&
        date.getDate() === d;
    }
  }

  // check the 11th digit is a valid citizenship code that can be either 0 or 1
  const citizenshipCode = idArray[10];
  const validCitizenshipCode = citizenshipCode === 0 || citizenshipCode === 1;

  // check that the 12th last digit is always 8
  const secondLastDigit = idArray[11];
  const validSecondLastDigit = secondLastDigit === 8;

  // check is valid checksum
  let sum = 0;
  for (let i = idArray.length - 1; i >= 0; i--) {
    const digit = idArray[i];
    const multiplier = (idArray.length - i) % 2 === 0 ? 2 : 1;
    const product = digit * multiplier;
    sum += product > 9 ? product - 9 : product;
  }
  const res = sum % 10 === 0;
  const validChecksum = res;

  return {
    validLength,
    validDate,
    validCitizenshipCode,
    validSecondLastDigit,
    validChecksum,
  };
};

/**
 * Checks if a South African ID number is valid.
 * @param id The ID number to check.
 * @returns A boolean indicating whether the ID number is valid.
 */

export const isValid = (id: string): boolean => {
  const result = validate(id);
  return Object.values(result).every((value) => value);
};
