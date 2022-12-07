import { describe, it, expect } from "vitest";
import { Folder, printFile, printFolder, printFolderName } from "./tree";

describe("print folder name", () => {
  type TestCase = [string, string, string];
  const testCases: TestCase[] = [
    ["", "", "/"],
    ["home", "", "home/"],
    ["home", "| | ", "| | home/"],
  ];

  testCases.forEach(([name, prefix, expected]) => {
    it(name, () => {
      expect(printFolderName(name, prefix)).toBe(expected);
    });
  });
});

describe("print file", () => {
  type TestCase = [string, string, string];
  const testCases: TestCase[] = [
    ["file1", "", "file1"],
    ["file2", "| | ", "| | file2"],
  ];
  testCases.forEach(([file, prefix, expected]) => {
    it(prefix + file, () => {
      expect(printFile(file, prefix)).toBe(expected);
    });
  });
});

describe("print folder tree", () => {
  it("empty root folder", () => {
    const rootFolder: Folder = ["", []];
    const result = printFolder(rootFolder, "", "");
    expect(result).toEqual(["/"]);
  });

  it("line of empty folders", () => {
    const rootFolder: Folder = ["", [["home", [["john-doe", []]]]]];
    const result = printFolder(rootFolder, "", "");
    expect(result).toEqual(["/", "┗home/", " ┗john-doe/"]);
  });

  it("docs folder", () => {
    const rootFolder: Folder = ["docs", ["file1", "file2", "file3"]];
    const result = printFolder(rootFolder, "", "");
    expect(result).toEqual(["docs/", "┣file1", "┣file2", "┗file3"]);
  });

  it("two folders with two files each", () => {
    const rootFolder: Folder = [
      "docs",
      [
        ["work", ["file1", "file2"]],
        ["not-work", ["file3", "file4"]],
      ],
    ];
    const result = printFolder(rootFolder, "", "");
    expect(result).toEqual(["docs/", "┣work/", "┃┣file1", "┃┗file2", "┗not-work/", " ┣file3", " ┗file4"]);
  });
});
