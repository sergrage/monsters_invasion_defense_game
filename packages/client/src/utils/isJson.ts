export const isJson = (input: unknown): boolean => {
  if (typeof input !== "string") return false;

  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }
  return true;
};
