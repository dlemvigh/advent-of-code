import * as fs from "fs";
import * as path from "path";

export function readInput(folder: string, filename = "input.txt"): string {
  return fs.readFileSync(path.join(folder, filename)).toString();
}

