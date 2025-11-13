import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { ensureFolder, fileFactory, Folder, folderFactory, handleLine, part1, part2, State } from "./day7";

describe("Day 7", () => {

  it("folder factory", () => {
    expect(folderFactory("")).toEqual({ name: "", folders: {}, files: {}, size: undefined } as Folder);
    expect(folderFactory("some-folder-name")).toEqual({ name: "some-folder-name", folders: {}, files: {}, size: undefined } as Folder);
  })

  it("file factory", ()=>{
    expect(fileFactory("some-file-name", 123)).toEqual({ name: "some-file-name", size: 123 } as File)
  })

  describe("handle line", () => {
    it("cd /", () => {
      // arrange
      const rootFolder = folderFactory("");
      const state: State = { rootFolder, currentFolder: rootFolder, pwd: [] }

      // act
      handleLine("$ cd /", state);

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder, pwd: [] });
    })

    it("$ ls", () => {
      // arrange
      const rootFolder = folderFactory("");
      const state: State = { rootFolder, currentFolder: rootFolder, pwd: [] }

      // act
      handleLine("$ ls", state);

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder, pwd: [] });
    })

    it("dir some-folder", () => {
      // arrange
      const rootFolder = folderFactory("");
      const state: State = { rootFolder, currentFolder: rootFolder, pwd: [] }

      // act
      handleLine("dir some-folder", state)

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder, pwd: [] } as State)
      expect(rootFolder.folders["some-folder"]).toBeDefined()
    });

    it("123 some-file-name", () => {
      // arrange
      const rootFolder = folderFactory("");
      const state: State = { rootFolder, currentFolder: rootFolder, pwd: [] }

      // act
      handleLine("123 some-file.txt", state)

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder, pwd: [] } as State)
      expect(state.rootFolder.files).toEqual({ ["some-file.txt"]: { name: "some-file.txt", size: 123 }})
    })

    it("$ cd some-folder", () => {
      // arrange
      const rootFolder = folderFactory("");
      ensureFolder(rootFolder, "some-folder");
      const state: State = { rootFolder, currentFolder: rootFolder, pwd: [] };

      // act
      handleLine("$ cd some-folder", state);

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder.folders["some-folder"], pwd: ["some-folder"]} as State)
    })

    it("$ cd ..",()=>{
      // arrange 
      const rootFolder = folderFactory("");
      const currentFolder = ensureFolder(rootFolder, "some-folder");
      const state: State = { rootFolder, currentFolder, pwd: ["some-folder"] };

      // act
      handleLine("$ cd ..", state);

      // assert
      expect(state).toEqual({ rootFolder, currentFolder: rootFolder, pwd: [] } as State);
    })
  })

  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe(95437);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe(1432936);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(24933642);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(272298);
    });
  });
});
