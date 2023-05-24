# zaid-ts

A tiny (0.93 kB GZIP) typescript for working with South African ID numbers.

## Getting Started

Installation:

```
npm install zaid-ts
# or
yarn add zaid-ts
# or
pnpm add zaid-ts
```

## Usage:

### Validation

```typescript
import { validate, isValid } from "zaid-ts";

const idNumber = "8801015120087";
const validationObject = validate(idNumber);
const isValidId = isValid(idNumber);

console.log(validationObject);
// Output: { validLength: true, validDate: true, validCitizenshipCode: true, validSecondLastDigit: true, validChecksum: true }

console.log(isValidId);
// Output: true
```

### Parsing

```typescript
import {
  isValid,
  getDateOfBirth,
  getGender,
  getCitizenship,
  parse,
  getAge,
} from "zaid-ts";

const idNumber = "8801015120087";

console.log(isValid(idNumber));
// Output: true

console.log(getDateOfBirth(idNumber));
// Output: 1988-01-01T00:00:00.000Z

console.log(getGender(idNumber));
// Output: 'female'

console.log(getCitizenship(idNumber));
// Output: 'SA citizen'

console.log(parse(idNumber));
// Output: { dateOfBirth: 1988-01-01T00:00:00.000Z, gender: 'Female', citizenship: 'SA citizen' }

console.log(getAge(idNumber));
// Output: 33
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
