import { unescape } from "querystring";

export type ListItem<T> = {
  value: T;
  next?: ListItem<T>;
};

export function array2list<T>(values: T[]): ListItem<T> {
  return values.reduceRight(
    (next: ListItem<T>, value: T) => ({ value, next }),
    undefined
  );
}

export function array2circle<T>(values: T[]): ListItem<T> {
  const head = array2list(values);
  let tail = head;
  while (tail.next) {
    tail = tail.next;
  }
  tail.next = head;
  return head;
}

export function list2array<T>(list: ListItem<T>): T[] {
  const values = [list.value];
  for (let it = list.next; it != undefined && it !== list; it = it.next) {
    values.push(it.value);
  }
  return values;
}

export function listLength(list: ListItem<unknown>): number {
  let len = 1;
  for (let it = list.next; it != undefined && it !== list; it = it.next) {
    len++;
  }
  return len;
}

export function findTail<T>(list: ListItem<T>): ListItem<T> | undefined {
  let it = list;
  while (it.next) {
    it = it.next;
    if (it === list) return undefined;
  }
  return it;
}

export function spliceNext<T>(list: ListItem<T>, length: number): ListItem<T> {
  const head = list.next;
  let tail = head;
  for (let i = 1; i < length; i++) {
    tail = tail.next;
  }
  list.next = tail.next;
  tail.next = undefined;
  return head;
}

export function insertNext<T>(
  list: ListItem<T>,
  next: ListItem<T>
): ListItem<T> {
  const tail = findTail(next);
  tail.next = list.next;
  list.next = next;
  return list;
}

export function findListItem<T>(
  list: ListItem<T>,
  value: T
): ListItem<T> | undefined {
  if (list.value === value) return list;
  for (let it = list.next; it != undefined && it !== list; it = it.next) {
    if (it.value === value) return it;
  }
  return undefined;
}
