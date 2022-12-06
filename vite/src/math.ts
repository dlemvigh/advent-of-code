export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

export function sumBy<T>(list: T[], selector: (item: T) => number): number {
  return list.reduce((sum, item) => {
    const value = selector(item);
    return sum + value
  }, 0)
}

export function average(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

export function averageBy<T>(list: T[], selector: (item: T) => number): number {
  return sumBy(list, selector) / list.length;
}

