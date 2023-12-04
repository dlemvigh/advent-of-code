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
    public class Day4
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var scores = parsed.Select(card => GetScratchcardScore(card.win, card.my));
            return scores.Sum();
        }

        public int GetScratchcardScore(IEnumerable<int> winNumbers, IEnumerable<int> myNumbers)
        {
            var myWinNumbers = winNumbers.Intersect(myNumbers);
            var myWinCount = myWinNumbers.Count();
            if (myWinCount <= 1) return myWinCount;
            var score = (int) Math.Pow(2, myWinCount - 1);
            return score;
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();

        }
        public IEnumerable<(IEnumerable<int> win, IEnumerable<int> my)> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseLine);
        }

        public (IEnumerable<int> win, IEnumerable<int> my) ParseLine(string line)
        {
            var lineParts = Regex.Split(line, @":\s+");
            var numberParts = Regex.Split(lineParts[1], @"\s+\|\s+");
            var winNumbers = Regex.Split(numberParts[0], @"\s+").Select(int.Parse);
            var myNumbers = Regex.Split(numberParts[1], @"\s+").Select(int.Parse);
            return (winNumbers, myNumbers);

        }
    }
}
