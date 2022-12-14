import { splitAndMapIntoGroups, splitAndMapIntoLines, splitIntoGroups } from "../util";

export type Packet = Item[]
export type Item = number | Packet;

export function isInRightOrder(left: Item, right: Item): boolean | undefined {
    if (typeof left === "number" && typeof right === "number") {
        return isIntegerInRightOrder(left, right);
    }
    if (typeof left === "number") {
        left = [left];
    }
    if (typeof right === "number") {
        right = [right]
    }
    return isListInRightOrder(left, right);
}

export function isIntegerInRightOrder(left: number, right: number): boolean | undefined {
    if (left < right) return true;
    if (left > right) return false;
    return undefined;
}

export function isListInRightOrder(left: Packet, right: Packet): boolean | undefined {
    const min = Math.min(left.length, right.length);

    for (let i = 0; i < min; i++) {
        const inOrder = isInRightOrder(left[i], right[i]);
        if (typeof inOrder === "boolean") {
            return inOrder;
        }
    }

    if (left.length != right.length) { // if left array is shortest
        return left.length < right.length;
    }

    return undefined;
}

export function comparePackets(a: Packet, b: Packet) {
    const inOrder = isInRightOrder(a, b)
    if (inOrder === true) return -1;
    if (inOrder === undefined) return 0;
    if (inOrder === false) return 1;
    throw new Error("Comparison failed")
}


export function part1(input: string) {
    const groups = splitAndMapIntoGroups(input, line => JSON.parse(line) as Packet);
    let sum = 0;

    groups.forEach((pair, index) => {
        const [left, right] = pair;
        const inOrder = isListInRightOrder(left, right);
        if (inOrder) {
            sum += index + 1;
        }
    })
    return sum;
}

export function part2(input: string) {
    const div1 = [[2]];
    const div2 = [[6]];
    const lines = splitAndMapIntoGroups(input, line => JSON.parse(line) as Packet).flatMap(line => line);
    lines.push(div1, div2);

    lines.sort(comparePackets);
    const i1 = lines.indexOf(div1);
    const i2 = lines.indexOf(div2);

    return (i1 + 1) * (i2 + 1); 
}