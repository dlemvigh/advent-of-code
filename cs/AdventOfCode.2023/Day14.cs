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
    public class Day14
    {
        public long Part1(string input)
        {
            var parsed = ParseInput(input);
            var moved = MoveAllRocksNorth(parsed);
            var load = GetRockLoad(moved);

            return load;
        }

        public long Part2(string input)
        {
            var rocks = ParseInput(input);
            var finalCycle = 1000000000L;
            var seenSet = new HashSet<string>() { input };
            var seenList = new List<string>() { input };

            var isSeenInput = (string input) => seenSet.Contains(input);
            var addSeenInput = (string input) => { 
                seenSet.Add(input);
                seenList.Add(input);
            };
            var getLoopSize = (string input) => {
                var tailLength = seenList.IndexOf(input);
                var loopLength = seenSet.Count - tailLength;
                return (tailLength, loopLength);
            };
            var getCycleInput = (long index) => {
                var (tailLength, loopLength) = getLoopSize(input);
                var finalIndex = tailLength + ((index - tailLength) % loopLength);
                var final = seenList[(int)finalIndex];
                return final;
            };           

            for (var cycleCount = 0; cycleCount < finalCycle; cycleCount++)
            {
                rocks = MoveRocksCycle(rocks);
                input = string.Join("\n", rocks);

                if (isSeenInput(input)) break;

                addSeenInput(input);
            }

            input = getCycleInput(finalCycle);
            rocks = ParseInput(input);

            var load = GetRockLoad(rocks);

            return load;
        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public long GetRockLoad(string[] lines)
        {
            long loadTotal = 0;
            for (var i = 0; i < lines.Length; i++)
            {
                var loadPerRock = lines.Length - i;
                var rocks = CountOccurences(lines[i], 'O');
                var load = loadPerRock * rocks;
                loadTotal += load;
            }
            return loadTotal;
        }

        public string[] Rotate(string[] lines)
        {
            var newLines = new string[lines[0].Length];
            for (int i = 0; i < lines.Length; i++)
            {
                newLines[i] = GetColumn(lines, i);
            }
            return newLines;
        }

        public string GetColumn(string[] lines, int index)
        {
            var chars = lines.Select(x => x[index]);
            return new string(chars.ToArray());
        }

        public string[] MoveRocksCycle(string[] lines)
        {
            lines = Rotate(lines);
            lines = MoveAllRocks(lines, true);
            lines = Rotate(lines);
            lines = MoveAllRocks(lines, true);
            lines = Rotate(lines);
            lines = MoveAllRocks(lines, false);
            lines = Rotate(lines);
            lines = MoveAllRocks(lines, false);
            return lines;
        }

        public string[] MoveAllRocksNorth(string[] lines)
        {
            lines = Rotate(lines);
            lines = MoveAllRocks(lines, true);
            lines = Rotate(lines);

            return lines;
        }

        public string[] MoveAllRocks(string[] lines, bool left)
        {
            return lines.Select(x => MoveRocks(x, left)).ToArray();
        }
        private static readonly Regex RocksAndSpaces = new Regex(@"[\.O]+", RegexOptions.Compiled);

        public string MoveRocks(string line, bool left)
        {
            return RocksAndSpaces.Replace(line, (match) =>
            {

                var rockCount = CountOccurences(match.Value, 'O');
                var emptyCount = CountOccurences(match.Value, '.');
                if (rockCount == 0 || emptyCount == 0) return match.Value;

                var rocks = new string('O', rockCount);
                var empty = new string('.', emptyCount);
                var replaced = left ? rocks + empty : empty + rocks;

                return replaced;
            });
        }

        public int CountOccurences(IEnumerable<char> chars, char c)
        {
            return chars.Count(x => x == c);
        }
    }
}
