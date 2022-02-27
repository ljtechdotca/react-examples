import fs from "fs";

export const parseFile = (path: string) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};
