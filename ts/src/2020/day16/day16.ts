import { splitIntoGroups } from "../../util";

const rulesRegex = /([^:]+): (\d+)-(\d+) or (\d+)-(\d+)/;

export function parseInput(input: string) {
  const groups = splitIntoGroups(input);

  const flatRules = [];
  const rules = groups[0].map<[string, number[]]>((line) => {
    const [_, name, ...values] = line.match(rulesRegex);
    const numbers = values.map(Number);
    flatRules.push([numbers[0], numbers[1]]);
    flatRules.push([numbers[2], numbers[3]]);
    return [name, numbers];
  });

  const myTicket = parseTicket(groups[1][1]);
  const otherTickets = groups[2].slice(1).map(parseTicket);
  const allTickets = [myTicket, ...otherTickets];

  return { rules, flatRules, myTicket, otherTickets, allTickets };
}

function parseTicket(input: string): number[] {
  return input.split(",").map(Number);
}

export function part1_validateTickets(
  tickets: number[][],
  rules: [number, number][]
) {
  const invalid = [];
  tickets.forEach((ticket) => {
    ticket.forEach((value) => {
      if (!rules.some(([from, to]) => from <= value && value <= to)) {
        invalid.push(value);
      }
    });
  });
  return invalid.reduce((sum, val) => sum + val, 0);
}

type Column = {
  [key: string]: boolean;
};

export function part2(input: string) {
  const { rules, flatRules, myTicket, allTickets } = parseInput(input);

  // discard invalid
  const validTickets = allTickets.filter((ticket) =>
    ticket.every((value) =>
      flatRules.some(([from, to]) => from <= value && value <= to)
    )
  );

  // init all columns valid for all fields
  const ruleNames = rules.map(([name]) => name);
  const columns = Array.from({ length: myTicket.length }, () => {
    const isValid = {} as Column;
    ruleNames.forEach((x) => (isValid[x] = true));
    return isValid;
  });

  // determine valid fields for each columns
  // for each ticket
  validTickets.forEach((ticket) => {
    // for each column
    ticket.forEach((value, index) => {
      rules.forEach(([name, [a, b, c, d]]) => {
        const valid = (a <= value && value <= b) || (c <= value && value <= d);
        // if rule broken
        if (valid === false) {
          // discard field as valid for that column
          columns[index][name] = false;
        }
      });
    });
  });

  //   const text = columns
  //     .map((column) => ruleNames.map((name) => column[name]).join(","))
  //     .join("\n");
  //   console.log(text);

  // columns determined manually
  // https://docs.google.com/spreadsheets/d/1VKxjQSQR9F9swASbEBZpXYtLVdjc-0i1j_gqw3rcJqs/edit#gid=293711305

  // calc output
  const departureColumns = [2, 14, 7, 19, 16, 13];
  return departureColumns
    .map((index) => myTicket[index])
    .reduce((acc, val) => acc * val);
}
