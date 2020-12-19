import { splitIntoGroups } from "../../util";

function parseInput(input: string) {
  return splitIntoGroups(input);
}

function isSimpleRule(rule: string) {
  return rule.indexOf("|") === -1;
}

function parseLine(line: string): string {
  //   console.log("line", line);
  return line.substr(line.indexOf(":") + 2);
}

const simpleRule = /(\d+): \"(\w+)\"/;
function compileRule0(input: string[]) {
  const rules = new Map<string, string>();
  const inputMap = new Map<string, string>();
  input.forEach((line) => {
    const [key, value] = line.split(": ");
    inputMap.set(key, value);
  });

  console.log(inputMap);

  // match simple rules
  input.forEach((line) => {
    const match = line.match(simpleRule);
    if (match) {
      const [_, key, value] = match;
      rules.set(key, value);
    }
  });

  // recursive match complex rules
  function compileRuleRecursive(index: string) {
    // console.log("compile rule rec", index);
    if (rules.has(index)) {
      return rules.get(index);
    }

    const rule = inputMap.get(index);
    let compiledRule;
    if (rule.indexOf("|") !== -1) {
      const subrules = rule.split(" | ").map(compileSubRule);
      compiledRule = subrules
        .map((r) => (isSimpleRule(r) ? r : `(${r})`))
        .join("|");
    } else {
      compiledRule = compileSubRule(rule);
    }
    rules.set(index, compiledRule);

    // console.log(`${index}:`, compiledRule);
    return compiledRule;
  }

  function compileSubRule(rule: string): string {
    const parts = rule.split(" ").map((term) => {
      if (rules.has(term)) return rules.get(term);
      return compileRuleRecursive(term);
    });

    const compiledRule = parts
      .map((r) => (isSimpleRule(r) ? r : `(${r})`))
      .join("");
    return compiledRule;
  }

  const regex = compileRuleRecursive("0");

  //   console.log("rules", rules);

  return new RegExp("^" + regex + "$");
}

export function part1(input: string) {
  const [rules, messages] = parseInput(input);
  //   console.log(rules, messages);
  const rule0 = compileRule0(rules);
  console.log(rule0);

  return messages.filter((msg) => rule0.test(msg)).length;
}
