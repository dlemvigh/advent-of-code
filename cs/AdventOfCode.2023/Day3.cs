using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
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

        public IEnumerable<MachineNumber> FindAllMachineNumbers(string[] image)
        {
            // loop through image
            // find all symbols
            var symbols = FindAllSymbols(image);

            // look around symbols
            foreach (var symbol in symbols)
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

                        // follow numbers left/right
                        // add FULL number to list, with location (row, start, end)
                        var number = FindMachineNumber(image[row], row, col);
                        if (number !=  null)
                        {
                            yield return number;
                        }
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

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();

        }
        public string[] ParseInput(string input)
        {
            return input.Split("\n").ToArray();
        }

        public record Symbol(char symbol, int row, int col);
        public record MachineNumber(int number, int row, int start, int end);
    }
}
