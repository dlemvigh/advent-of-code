export type Item = File | Folder;
export type File = string;
export type Folder = [string, Item[]];

export type Prefix = string;

const FOLDER = "/";
const SKIP = "┃";
const FORK = "┣";
const LAST = "┗";
const NONE = " ";

function isFile(item: Item): item is File {
  return typeof item === "string";
}
function isFolder(item: Item): item is Folder {
  return typeof item !== "string";
}

function printItem(item: Item, selfPrefix: Prefix, contentPrefix: Prefix): string[] {
  if (isFile(item)) {
    return [printFile(item, selfPrefix)];
  }
  if (isFolder(item)) {
    return printFolder(item, selfPrefix, contentPrefix);
  }
  throw new Error("Unknown print type");
}

export function printFile(file: string, prefix: Prefix): string {
  return prefix + file;
}

export function printFolderName(name: string, prefix: Prefix): string {
  return prefix + name + FOLDER;
}

export function printFolder(folder: Folder, selfPrefix: Prefix, contentPrefix: Prefix = ""): string[] {
  const [name, content] = folder;
  const lines = [
    printFolderName(name, selfPrefix),
    ...content.flatMap((item, index) => {
      const isLast = index + 1 === content.length;
      return printItem(item, contentPrefix + (isLast ? LAST : FORK), contentPrefix + (isLast ? NONE : SKIP));
    }),
  ];
  return lines;
}
