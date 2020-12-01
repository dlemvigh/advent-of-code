function dealIntoNewStack(list) {
  return list.reverse();
}

function dealIntoNewStackIndexOnly(length, index) {
  return length - index - 1;
}

function cut(list, N) {
  return [...list.slice(N), ...list.slice(0, N)];
}

function cutIndexOnly(length, N, index) {
  return (length + index + N) % length;
}

function dealWithIncrement(list, N) {
  const result = new Array(list.length);
  for (let i = 0, j = 0; i < list.length; i++, j += N) {
    result[j % list.length] = list[i];
  }
  return result;
}

function range(n) {
  return Array.from({ length: n }, (x, i) => i);
}

function parse(line, list) {
  let match = null;
  const regex1 = /deal into new stack/;
  const regex2 = /cut (-?\d+)/;
  const regex3 = /deal with increment (\d+)/;

  if ((match = line.match(regex1))) {
    return dealIntoNewStack(list);
  }
  if ((match = line.match(regex2))) {
    const [_, N] = match;
    return cut(list, Number(N));
  }
  if ((match = line.match(regex3))) {
    const [_, N] = match;
    return dealWithIncrement(list, Number(N));
  }
}

function part1(N, input) {
  let list = range(N);
  input.split("\n").forEach(line => {
    list = parse(line, list);
  });
  return list;
}

module.exports = { dealIntoNewStack, dealWithIncrement, cut, range, part1 };
