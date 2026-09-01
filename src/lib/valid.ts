import { ValidationObject } from "types";

import { readBirthDate } from "./date";

const ID_LENGTH = 13;
const CITIZENSHIP_INDEX = 10;
const REGISTER_INDEX = 11;
const CHECK_DIGIT_INDEX = 12;
const VALID_CITIZENSHIP_CODES = new Set([0, 1, 2]);
const DIGIT_PATTERN = /^[0-9]$/;

const hasValidFormat = (id: string): boolean =>
  id.length === ID_LENGTH &&
  [...id].every((digit) => DIGIT_PATTERN.test(digit));

const getCheckDigit = (digits: number[]): number => {
  const sourceDigits = digits.slice(0, CHECK_DIGIT_INDEX);
  const oddSum = sourceDigits.reduce(
    (sum, digit, index) => sum + (index % 2 === 0 ? digit : 0),
    0
  );
  const evenDigits = sourceDigits
    .filter((_, index) => index % 2 === 1)
    .join("");
  const doubledEvenSum = [...String(Number(evenDigits) * 2)].reduce(
    (sum, digit) => sum + Number(digit),
    0
  );

  return (10 - ((oddSum + doubledEvenSum) % 10)) % 10;
};

export const validate = (id: string): ValidationObject => {
  const validLength = hasValidFormat(id);

  if (!validLength) {
    return {
      validLength: false,
      validDate: false,
      validCitizenshipCode: false,
      validSecondLastDigit: false,
      validChecksum: false,
    };
  }

  const digits = [...id].map(Number);
  const validDate = readBirthDate(id) !== null;
  const validCitizenshipCode = VALID_CITIZENSHIP_CODES.has(
    digits[CITIZENSHIP_INDEX]
  );
  const validSecondLastDigit = Number.isInteger(digits[REGISTER_INDEX]);
  const validChecksum = digits[CHECK_DIGIT_INDEX] === getCheckDigit(digits);

  return {
    validLength,
    validDate,
    validCitizenshipCode,
    validSecondLastDigit,
    validChecksum,
  };
};

export const isValid = (id: string): boolean =>
  Object.values(validate(id)).every(Boolean);
