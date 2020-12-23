import {
  array2circle,
  array2list,
  list2array,
  listLength,
  ListItem,
  spliceNext,
  findListItem,
} from "./linked-list";

describe("conversion", () => {
  it("array to linked list", () => {
    const input = ["a", "b", "c"];
    const res = array2list(input);
    expect(res.value).toBe("a");
    expect(res.next.value).toBe("b");
    expect(res.next.next.value).toBe("c");
    expect(res.next.next.next).toBeUndefined();
  });

  it("array to circular list", () => {
    const input = ["a", "b", "c"];
    const res = array2circle(input);
    expect(res.value).toBe("a");
    expect(res.next.value).toBe("b");
    expect(res.next.next.value).toBe("c");
    expect(res.next.next.next).toBe(res);
  });
  it("list to array", () => {
    const input = { value: "foo", next: { value: "bar" } };
    const res = list2array(input);
    expect(res).toEqual(["foo", "bar"]);
  });

  it("circular list to array", () => {
    const list: ListItem<string> = { value: "me" };
    list.next = list;
    const res = list2array(list);
    expect(res).toEqual(["me"]);
  });
});

describe("length", () => {
  it("list length", () => {
    const input = { value: "foo", next: { value: "bar" } };
    const res = listLength(input);
    expect(res).toEqual(2);
  });

  it("circular list length", () => {
    const list: ListItem<string> = { value: "me" };
    list.next = list;
    const res = listLength(list);
    expect(res).toEqual(1);
  });
});

describe("splice", () => {
  it("slice 1", () => {
    // arrange
    const input = array2list([1, 2, 3]);

    // act
    const res = spliceNext(input, 1);

    // assert
    expect(listLength(res)).toBe(1);
    expect(list2array(res)).toEqual([2]);

    expect(listLength(input)).toBe(2);
    expect(list2array(input)).toEqual([1, 3]);
  });

  it("slice 3", () => {
    // arrange
    const input = array2list([1, 2, 3, 4, 5, 6, 7]);

    // act
    const res = spliceNext(input, 3);

    // assert
    expect(listLength(res)).toBe(3);
    expect(list2array(res)).toEqual([2, 3, 4]);

    expect(listLength(input)).toBe(4);
    expect(list2array(input)).toEqual([1, 5, 6, 7]);
  });

  it("slice circle", () => {
    // arrange
    const input = array2circle([1, 2, 3, 4, 5, 6, 7]);

    // act
    const res = spliceNext(input, 3);

    // assert
    expect(listLength(res)).toBe(3);
    expect(list2array(res)).toEqual([2, 3, 4]);

    expect(listLength(input)).toBe(4);
    expect(list2array(input)).toEqual([1, 5, 6, 7]);
  });
});

describe("find list item", () => {
  it("find integer", () => {
    const input = array2list([1, 2, 3, 4, 5]);

    const res = findListItem(input, 3);

    expect(res).not.toBeUndefined();
    expect(res.value).toBe(3);
  });

  it("find string", () => {
    const input = array2list(["foo", "bar", "baz"]);

    const res = findListItem(input, "foo");

    expect(res).not.toBeUndefined();
    expect(res.value).toBe("foo");
  });

  it("find in circle", () => {
    const input = array2circle([1, 2, 3, 4, 5]);

    const res = findListItem(input, 5);

    expect(res).not.toBeUndefined();
    expect(res.value).toBe(5);
  });

  it("miss in list", () => {
    const input = array2list([1, 2, 3, 4, 5]);

    const res = findListItem(input, 42);

    expect(res).toBeUndefined();
  });

  it("miss in circle", () => {
    const input = array2circle([1, 2, 3, 4, 5]);

    const res = findListItem(input, 42);

    expect(res).toBeUndefined();
  });
});
