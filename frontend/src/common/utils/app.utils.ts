// Typical character length requirement to perform search
const DEFAULT_MIN_LENGTH = 3;

export const validateMinLength = (value?: string, minLength = DEFAULT_MIN_LENGTH) => {
  return !!value && value.length >= minLength;
};
