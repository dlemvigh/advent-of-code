using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day9
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var next = parsed.Select(GetNextInSequence);
            var sum = next.Sum();
            return sum;
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            var next = parsed.Select(GetPrevInSequence);
            var sum = next.Sum();
            return sum;
        }

        public IEnumerable<int> GetDiffs(IEnumerable<int> input)
        {
            bool isFirst = true;
            int prev = 0;

            foreach (var next in input)
            {
                var diff = next - prev;
                prev = next;

                if (isFirst)
                {
                    isFirst = false;
                    continue;
                }

                yield return diff;
            }
        }

        public int GetNextInSequence(IEnumerable<int> input)
        {
            if (input.All(x => x == 0))
            {
                return 0;
            }

            var diffs = GetDiffs(input);
            var nextDiff = GetNextInSequence(diffs);

            return input.Last() + nextDiff;
        }

        public int GetPrevInSequence(IEnumerable<int> input)
        {
            if (input.All(x => x == 0))
            {
                return 0;
            }

            var diffs = GetDiffs(input);
            var prevDiff = GetPrevInSequence(diffs);

            return input.First() - prevDiff;
        }

        public IEnumerable<IEnumerable<int>> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseLine);
        }

        public IEnumerable<int> ParseLine(string line)
        {
            return line.Split(" ").Select(int.Parse);
        }
    }
}
