using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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

            var cases = parsed.Select(Part1Line).ToList();

            return cases.Sum();
        }

        public int Part1Line(string input)
        {
            var digits = GetDigits(input);
            var value = GetFirstAndLast(digits);
            return value;

        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);

            var cases = parsed.Select(Part2Line).ToList();

            return cases.Sum();
        }

        public int Part2Line(string input)
        {
            var digits = GetDigitsOrWords(input);
            var value = GetFirstAndLast(digits);
            return value;

        }

        public IEnumerable<string> ParseInput(string input)
        {
            return input.Split("\n");
        }

        public IEnumerable<char> GetDigits(string input)
        {
            return input.Where(char.IsDigit);
        }

        public IEnumerable<int> GetDigitsOrWords(string input)
        {
            var replacements = new Dictionary<string, int>
            {
                {"one", 1 },
                {"two", 2 },
                {"three", 3 },
                {"four", 4 },
                {"five", 5 },
                {"six", 6 },
                {"seven", 7 },
                {"eight", 8 },
                {"nine", 9 },
            };

            for (var i = 0; i < input.Length; i++)
            {
                if (char.IsDigit(input[i]))
                {
                    yield return input[i] - '0';
                } else
                {
                    foreach(var pair in replacements) {
                        if (input.Length >= i + pair.Key.Length && 
                            input.Substring(i, pair.Key.Length) == pair.Key)
                        {
                            yield return pair.Value;
                        }
                    }
                }


            }
        }

        public string ReplaceStrings(string input, bool leftToRight = true)
        {
            var replacements = new Dictionary<string, string>
            {
                {"one", "1" },
                {"two", "2" },
                {"three", "3" },
                {"four", "4" },
                {"five", "5" },
                {"six", "6" },
                {"seven", "7" },
                {"eight", "8" },
                {"nine", "9" },
            };

            var pattern = "(?=(" + String.Join("|", replacements.Keys) + "))";
            var matches = Regex.Matches(input, pattern);
            var match = leftToRight ? matches.First() : matches.Last();

            var replaced = input.Substring(0, match.Index) +
                replacements[match.Value] +
                input.Substring(match.Index + match.Length);

            return replaced;
        }

        public int GetFirstAndLast(IEnumerable<char> digits)
        {
            var digit10s = digits.First() - '0';
            var digit1s = digits.Last() - '0';

            return digit10s * 10 + digit1s;
        }

        public int GetFirstAndLast(IEnumerable<int> digits)
        {
            var digit10s = digits.First();
            var digit1s = digits.Last();

            return digit10s * 10 + digit1s;
        }
    }
}
