using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Hot Springs")]
    public class Day12
    {
        public long Part1(string input)
        {
            var parsed = ParseInput(input);
            var arrangements = parsed.AsParallel().Select(DoWork);
            return arrangements.Sum();
        }

        public long Part2(string input)
        {
            var parsed = ParseInput2(input);
            var arrangements = parsed.AsParallel().Select(DoWork);
            return arrangements.Sum();
        }

        public long DoWork(Row row)
        {
            var worker = new Worker();
            return worker.CountArrangements(row);
        }
        public IEnumerable<Row> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseLine);
        }
        public IEnumerable<Row> ParseInput2(string input)
        {
            return input.Split("\n").Select(ParseLine2);
        }

        public Row ParseLine(string line)
        {
            var parts = line.Split(" ");
            var groups = parts[1].Split(",").Select(int.Parse).ToArray();
            return new Row(parts[0], groups);
        }

        public Row ParseLine2(string input)
        {
            var row = ParseLine(input);
            var line = string.Join('?', Enumerable.Repeat(row.line, 5));
            var groups = Enumerable.Repeat(row.groups, 5).SelectMany(x => x);
            return new Row(line, groups.ToArray());
        }   

        public class Worker
        {
            private readonly Dictionary<(string, string), long> cache;

            public Worker()
            {
                cache = new Dictionary<(string, string), long>();
            }
            public long CountArrangements(Row row)
            {
                var key = (row.line, string.Join(',', row.groups));
                if (cache.ContainsKey(key))
                {
                    return cache[key];
                }

                if (row.groups.Length == 0 && !row.line.Contains('#'))
                {
                    return 1;
                }

                var count = 0L;
                var line = TrimStart(row.line);

                if (line.Length == 0 && row.groups.Length > 0)
                {
                    return 0;
                }

                if (line.Length > 0 && row.groups.Length == 0)
                {
                    return 0;
                }


                if (line[0] == '?')
                {
                    var maybeCount = CountArrangements(new Row(line[1..], row.groups));
                    count += maybeCount;
                }

                var next = TryTake(row.groups[0], line);
                if (next != null)
                {
                    var nextCount = CountArrangements(new Row(next, row.groups[1..]));
                    count += nextCount;
                }

                cache[key] = count;

                return count;
            }

            public string TrimStart(string line)
            {
                return line.TrimStart('.');
            }

            public string? TryTake(int count, string line)
            {
                var regex = $"^([#\\?]{{{count}}})(?:([\\?\\.]\\.*)(.*)|$)";
                var match = Regex.Match(line, regex);

                if (!match.Success)
                {
                    return null;
                }

                var next = match.Groups[3].Value ?? "";
                return next;
            }

            public bool CanTakeAll(IEnumerable<int> groups, string line)
            {
                foreach (var group in groups)
                {
                    var nextLine = TryTake(group, line);
                    if (nextLine == null)
                    {
                        return false;
                    }
                    line = nextLine;
                }

                var endOfLineIsEmpty = !line.Contains('#');

                return endOfLineIsEmpty;
            }
        }

        public record Row (string line, int[] groups);
    }
}
