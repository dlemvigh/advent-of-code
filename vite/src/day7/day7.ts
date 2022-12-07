import { sumBy } from "../math"
import { splitIntoLines } from "../util"

export type File = { name: string, size: number }
export type Folder = { 
    name: string, 
    folders: { [name: string]: Folder },
    files: { [name: string]: File }, 
    size?: number }
export type State = {
    rootFolder: Folder,
    currentFolder: Folder,
    pwd: string[]
}

export function isFolder(item: File | Folder): item is Folder {
    return "content" in item;
} 

export function isFile(item: File | Folder): item is File {
    return !isFolder(item);
}

export function folderFactory(name: string): Folder {
    return {
        name: name,
        folders: {},
        files: {}
    }
}

export function fileFactory(name: string, size: number): File {
    return { name, size }
}

export function ensureFolder(currentFolder: Folder, name: string): Folder {
    if (currentFolder.folders[name] == null) {
        currentFolder.folders[name] = folderFactory(name);
    }
    return currentFolder.folders[name];
}

export function addFile(currentFolder: Folder, name: string, size: number): File {
    if( currentFolder.files[name] != null) {
        throw new Error(`File already exists: ${name}`)
    }
    currentFolder.files[name] = fileFactory(name, size);
    return currentFolder.files[name];
}

export function getCurrentFolder(rootFolder: Folder, path: string[]): Folder {
    return path.reduce(
        (folder: Folder, name: string) => folder.folders[name], 
        rootFolder
    );
}

export function isChangeDirRoot(line: string): boolean {
    return line === "$ cd /" 
}

export function isChangeDirUp(line: string): boolean {
    return line === "$ cd ..";
}
export function isChangeDir(line: string): string | undefined {
    const match = line.match(/\$ cd (\w.*)/);
    if (match) {
        const [_, name] = match;
        return name
    }
    return undefined;
}

export function isLsCmd(line: string): boolean {
    return line === "$ ls" 
}

export function isLsDir(line: string): string | void {
    const match = line.match(/dir (.+)/);
    if (match) {
        const [_, name] = match;
        return name;
    }
}

export function isLsFile(line: string): [string, number] | void {
    const match = line.match(/(\d+) (.+)/);
    if (match) {
        const [_, size, name] = match;
        return [name, Number(size)]
    }
}

export function handleLine(line: string, state: State): void {
    const { rootFolder, currentFolder, pwd } = state;

    if (isChangeDirRoot(line)) { 
        state.currentFolder = rootFolder; 
    };
    
    if (isChangeDirUp(line)) { 
        pwd.pop();
        state.currentFolder = getCurrentFolder(rootFolder, pwd);
    }

    let folderName: string | void;
    if (folderName = isChangeDir(line)) {
        pwd.push(folderName);
        state.currentFolder = currentFolder.folders[folderName];
    }

    if (isLsCmd(line)) { /* Do nothing */ }

    let file: [string, number] | void;
    if(file = isLsFile(line)) {
        const [name, size] = file;
        addFile(currentFolder, name, size);
    }

    if (folderName = isLsDir(line)) {
        ensureFolder(currentFolder, folderName);
    }
}

export function calculateFolderSize(folder: Folder): number {
    folder.size = 0;
    Object.values(folder.folders).forEach(subFolder => {
        calculateFolderSize(subFolder);
    })
    folder.size += sumBy(Object.values(folder.folders), x => x.size ?? 0);
    folder.size += sumBy(Object.values(folder.files), x => x.size);
    return folder.size;
}

export function getFoldersBelowSize(folder: Folder, maxSize: number): Folder[] {
    const foldersBelowSize: Folder[] = Object.values(folder.folders).flatMap(f => getFoldersBelowSize(f, maxSize))

    if (folder.size != null && folder.size < maxSize) {
        foldersBelowSize.push(folder);
    }

    return foldersBelowSize;
}

export function getAllFolders(folder: Folder): Folder[] {
    const subFolders = Object.values(folder.folders).flatMap(f => getAllFolders(f))
    return [
        folder,
        ...subFolders
    ];
}

export function part1(input: string) {
    const lines = splitIntoLines(input);

    const rootFolder: Folder = folderFactory("");
    const pwd: string[] = []

    const state: State = { 
        rootFolder,
        currentFolder: rootFolder,
        pwd
    }

    for (const line of lines) {
        handleLine(line, state);
    }
    calculateFolderSize(rootFolder);
    const foldersBelowSize = getFoldersBelowSize(rootFolder, 100000);
    const folderSum = sumBy(foldersBelowSize, x => x.size ?? 0);

    return folderSum;
}

export function part2(input: string) {
    const lines = splitIntoLines(input);

    const rootFolder: Folder = folderFactory("");
    const pwd: string[] = []

    const state: State = { 
        rootFolder,
        currentFolder: rootFolder,
        pwd
    }

    for (const line of lines) {
        handleLine(line, state);
    }
    calculateFolderSize(rootFolder);
    const allFolders = getAllFolders(rootFolder);
    allFolders.sort((a, b) => (a.size ?? 0) - (b.size ?? 0));

    const discCapacity = 70000000;
    const neededSpace = 30000000;
    const usedSpace = rootFolder.size ?? 0;
    const availableSpace = (discCapacity - neededSpace - usedSpace)
    const spaceToCleanUp = - availableSpace;
    const smallestNeededFolder = allFolders.find(folder => (folder.size ?? 0) > spaceToCleanUp)
    return smallestNeededFolder?.size ?? 0;
}