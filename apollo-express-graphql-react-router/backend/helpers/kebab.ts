export const kebab = (string: string) => {
  return string
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();
};