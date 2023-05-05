export const getError = (error) => {
  const networkError = error?.result?.errors || error?.result?.message;
  let errors;
  if (networkError && Array.isArray(networkError)) {
    errors = networkError.reduce(
      (collectedErrors, item) => ({
        ...collectedErrors,
        [item?.property]: item?.constraints
          ? Object.keys(item?.constraints)
              .map(
                (issueName) =>
                  ERROR_LIST?.[issueName] || item?.constraints?.[issueName]
              )
              .join('\n ')
          : 'Field must be specified',
      }),
      {}
    );
  } else if (
    typeof networkError === 'string' &&
    networkError.startsWith('IM00')
  ) {
    errors = {
      common_text: networkError,
      common_issue: true,
    };
  } else if (networkError) {
    errors = {
      common: JSON.stringify(networkError),
      common_issue: true,
    };
  } else {
    errors = {};
  }

  return errors;
};

const ERROR_LIST = {
  // common
  allow: '',
  isDefined: '',
  isOptional: '',
  validate: '',
  validateBy: '',
  validateIf: '',
  validateNested: '',
  validatePromise: '',
  isLatLong: '',
  isLatitude: '',
  isLongitude: '',
  equals: '',
  notEquals: '',
  isEmpty: '',
  isNotEmpty: '',
  isIn: '',
  isNotIn: '',
  // number
  isDivisibleBy: '',
  isPositive: '',
  isNegative: '',
  max: '',
  min: '',
  // date
  minDate: '',
  maxDate: '',
  // string
  contains: '',
  notContains: '',
  isAlpha: '',
  isAlphanumeric: '',
  isDecimal: '',
  isAscii: '',
  isBase64: '',
  isByteLength: '',
  isCreditCard: '',
  isCurrency: '',
  isEmail: 'IM0012',
  isFQDN: '',
  isFullWidth: '',
  isHalfWidth: '',
  isVariableWidth: '',
  isHexColor: '',
  isHexadecimal: '',
  isMacAddress: '',
  isIP: '',
  isPort: '',
  isISBN: '',
  isISIN: '',
  isISO8601: '',
  isJSON: '',
  isJWT: '',
  isLowercase: '',
  isMobilePhone: '',
  isISO31661Alpha2: '',
  isISO31661Alpha3: '',
  isMongoId: '',
  isMultibyte: '',
  isSurrogatePair: '',
  isUrl: '',
  isUUID: '',
  isFirebasePushId: '',
  isUppercase: '',
  length: '',
  maxLength: '',
  minLength: '',
  matches: '',
  isPhoneNumber: 'IM0011',
  isMilitaryTime: '',
  isHash: '',
  isISSN: '',
  isDateString: '',
  isBooleanString: '',
  isNumberString: '',
  isBase32: '',
  isBIC: '',
  isBtcAddress: '',
  isDataURI: '',
  isEAN: '',
  isEthereumAddress: '',
  isHSL: '',
  isIBAN: '',
  isIdentityCard: '',
  isISRC: '',
  isLocale: '',
  isMagnetURI: '',
  isMimeType: '',
  isOctal: '',
  isPassportNumber: '',
  isPostalCode: '',
  isRFC3339: '',
  isRgbColor: '',
  isSemVer: '',
  isStrongPassword: 'IM0003',
  isTimeZone: '',
  isBase58: '',
  'is-tax-id': '',
  'is-iso4217-currency-code': '',
  // typechecker
  isBoolean: '',
  isDate: '',
  isNumber: '',
  isEnum: '',
  isInt: '',
  isString: 'IM0027',
  isArray: '',
  isObject: '',
  // array
  arrayContains: '',
  arrayNotContains: '',
  arrayNotEmpty: '',
  arrayMinSize: '',
  arrayMaxSize: '',
  arrayUnique: '',
  isNotEmptyObject: '',
  isInstance: '',
};
