using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day1
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);

            var cases = parsed.Select(line => {
                var digits = GetDigits(line);
                var value = GetFirstAndLast(digits);
                return value;
            });


            return cases.Sum();
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);

            throw new NotImplementedException();

        }
        public IEnumerable<string> ParseInput(string input)
        {
            return input.Split("\n");
        }

        public IEnumerable<char> GetDigits(string input)
        {
            return input.Where(char.IsDigit);
        }

        public int GetFirstAndLast(IEnumerable<char> digits)
        {
            var digit10s = digits.First() - '0';
            var digit1s = digits.Last() - '0';
            return digit10s * 10 + digit1s;
        }
    }
}
