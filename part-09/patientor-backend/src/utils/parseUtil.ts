export const isString = (arg: unknown): arg is string => {
  return typeof arg === "string" || arg instanceof String;
};

export const parseString = (arg: unknown): string => {
  if (!arg || !isString(arg)) {
    throw new Error("Incorrect or missing string: " + arg);
  }
  return arg;
};

export const parseStrings = (arg: unknown): string[] => {
  if (!arg || !Array.isArray(arg)) {
    throw new Error("Incorrect or missing array: " + arg);
  }
  arg.forEach((a) => {
    if (!isString(a)) {
      throw new Error("Incorrect or missing string: " + a);
    }
  });
  return arg as string[];
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (arg: unknown): string => {
  if (!arg || !isString(arg) || !isDate(arg)) {
    throw new Error("Incorrect or missing date: " + arg);
  }
  return arg;
};

export const parseNumber = (arg: unknown): number => {
  if (arg === null || isNaN(Number(arg))) {
    throw new Error("Incorrect or missing number: " + arg);
  }
  return Number(arg);
};
