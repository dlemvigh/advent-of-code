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
            var finalCycle = 1000000000L;
            var seen = new List<string>() { input };
            var rocks = ParseInput(input);
            var count = 0;
            while (count < finalCycle)
            {
                rocks = MoveRocksCycle(rocks);
                input = string.Join("\n", rocks);

                if (seen.Contains(input)) break;
                seen.Add(input);
                count++;
            }

            var tailLength = seen.IndexOf(input);
            var loopLength = seen.Count - tailLength;
            var finalIndex = tailLength + ((finalCycle - tailLength) % loopLength);
            var final = seen[(int)finalIndex];

            var load = GetRockLoad(ParseInput(final));
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

        public string MoveRocks(string line, bool left)
        {
            return Regex.Replace(line, @"[\.O]+", (match) =>
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
