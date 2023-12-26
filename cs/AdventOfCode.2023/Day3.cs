using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;
using static AdventOfCode.Y2023.Day3;

namespace AdventOfCode.Y2023
{
    [ProblemName("Gear Ratios")]
    public class Day3
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);

            var numbers = FindAllMachineNumbers(parsed);

            return numbers.Distinct().Sum(x => x.number);
        }
        public int Part2(string input)
        {
            var parsed = ParseInput(input);

            var numbers = FindGearMachineNumbers(parsed);

            return numbers.Sum();
        }

        public IEnumerable<MachineNumber> FindAllMachineNumbers(string[] image)
        {
            var symbols = FindAllSymbols(image);

            IEnumerable<MachineNumber> numbers = symbols.SelectMany(symbol => FindMachineNumbersForSymbol(image, symbol));

            return numbers;
        }

        public IEnumerable<int> FindGearMachineNumbers(string[] image)
        {
            var symbols = FindAllSymbols(image).Where(x => x.symbol == '*');

            var numbers = symbols.Select(symbol => {
                var numbers = FindMachineNumbersForSymbol(image, symbol).Distinct();
                if (numbers.Count() != 2)
                {
                    return 0;
                }
                return numbers.First().number * numbers.Last().number;
            });

            return numbers;
        }

        public IEnumerable<MachineNumber> FindMachineNumbersForSymbol(string[] image, Symbol symbol)
        {
            for (var row = symbol.row - 1; row <= symbol.row + 1; row++)
            {
                for (var col = symbol.col - 1; col <= symbol.col + 1; col++)
                {
                    if (
                        row < 0 ||
                        col < 0 ||
                        row >= image.Length ||
                        col >= image[row].Length
                    ) continue;

                    var number = FindMachineNumber(image[row], row, col);
                    if (number != null)
                    {
                        yield return number;
                    }
                }
            }
        }

        public MachineNumber? FindMachineNumber(string line, int row, int col)
        {
            if (!char.IsDigit(line[col])) return null;

            var start = col;
            var end = col;
            while (start > 0 && char.IsDigit(line[start - 1])) { start--; }
            while (end < line.Length - 1 && char.IsDigit(line[end + 1])) { end++; }

            var valueStr = line.Substring(start, end - start + 1);
            var value = int.Parse(valueStr);

            return new MachineNumber(value, row, start, end);
        }

        public IEnumerable<Symbol> FindAllSymbols(string[] image)
        {
            for (var row = 0; row < image.Length; row++)
            {
                for (var col = 0; col < image[0].Length; col++)
                {
                    var symbol = image[row][col];
                    if (char.IsDigit(symbol)) continue;
                    if (symbol == '.') continue;

                    yield return new Symbol(symbol, row, col);
                }
            }

        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n").ToArray();
        }

        public record Symbol(char symbol, int row, int col);
        public record MachineNumber(int number, int row, int start, int end);
    }
}
