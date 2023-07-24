export const boolean = (input: string | boolean): boolean => {
  return typeof input === "boolean" || ["true", "false"].includes(input.trim());
};

export const number = (input: string | number): boolean => {
  return typeof input === "number" || /^\d+(\.\d+)?$/.test(input.trim());
};

export const string = (input: string): boolean => {
  return typeof input === "string" || (!boolean(input) && !number(input));
};
