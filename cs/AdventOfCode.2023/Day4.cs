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
        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            var cardCounts = Enumerable.Repeat(1, parsed.Count()).ToArray();
            var winCounts = parsed.Select(card => GetScratchcardWinCount(card.win, card.my)).ToArray();

            for (var card = 0; card < winCounts.Length; card++)
            {
                var cardCount = cardCounts[card];
                var winCount = winCounts[card];
                if (winCount > 0)
                {
                    for (var i = 0; i < winCount; i++)
                    {
                        cardCounts[card + i + 1] += cardCount;
                    }
                }
            }

            return cardCounts.Sum();
        }

        public int GetScratchcardScore(IEnumerable<int> winNumbers, IEnumerable<int> myNumbers)
        {
            var myWinCount = GetScratchcardWinCount(winNumbers, myNumbers);
            if (myWinCount <= 1) return myWinCount;
            var score = (int) Math.Pow(2, myWinCount - 1);
            return score;
        }

        public int GetScratchcardWinCount(IEnumerable<int> winNumbers, IEnumerable<int> myNumbers)
        {
            var myWinNumbers = winNumbers.Intersect(myNumbers);
            var myWinCount = myWinNumbers.Count();
            return myWinCount;
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
