using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day5
{
    public interface IInputParser
    {
        Mapper ParseMap(string input);
        Mapper[][] ParseMapperGroups(IEnumerable<string> groups);
        IEnumerable<LongRange> ParseSeedRanges(string line);
        long[] ParseSeeds(string line);
    }

    public class InputParser : IInputParser
    {
        public long[] ParseSeeds(string line)
        {
            var parts = line.Split(": ");
            var seeds = parts[1].Split(" ").Select(long.Parse).ToArray();
            return seeds;
        }

        public IEnumerable<LongRange> ParseSeedRanges(string line)
        {
            var parts = line.Split(": ");
            var values = parts[1].Split(" ").Select(long.Parse);
            var seedRanges = values.Chunk(2).Select(pair =>
            {
                var start = pair.First();
                var range = pair.Last();
                var end = start + range - 1;

                return new LongRange(start, end);
            });
            return seedRanges;
        }

        public Mapper[][] ParseMapperGroups(IEnumerable<string> groups)
        {
            return groups.Select(group =>
            {
                var lines = group.Split("\n").Skip(1);
                return lines.Select(ParseMap).ToArray();
            }).ToArray();
        }

        public Mapper ParseMap(string input)
        {
            var parts = input.Split(" ").Select(long.Parse).ToArray();

            var dest = parts[0];
            var src = parts[1];
            var range = parts[2];

            var from = new LongRange(src, src + range - 1);
            var to = new LongRange(dest, dest + range - 1);
            var diff = dest - src;

            var mapper = new Mapper(from, to, diff);
            return mapper;
        }
    }

    public record LongRange(long Start, long End);
    public record Mapper(LongRange From, LongRange To, long Diff);
}
