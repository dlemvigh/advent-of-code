using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day5
    {
        public long Part1(string input)
        {
            var (seeds, mapperGroups) = ParseInput(input);

            var values = seeds.Select(seed => Map(seed, mapperGroups));

            return values.Min();
        }

        public long Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();

        }
        public (long[] seeds, Mapper[][] mapperGroups) ParseInput(string input)
        {
            var groups = input.Split("\n\n");

            var seeds = ParseSeeds(groups[0]);
            var mapperGroups = groups.Skip(1).Select(group =>
            {
                var lines = group.Split("\n").Skip(1);
                return lines.Select(ParseMap).ToArray();
            }).ToArray();

            return (seeds, mapperGroups);
        }

        public bool IsInRange(long value, Mapper mapper)
        {
            return mapper.From.Start <= value && value <= mapper.From.End;
        }

        public long Map(long value, Mapper mapper)
        {
            if (IsInRange(value, mapper))
            {
                return value += mapper.Diff;
            }
            return value;
        }

        public long Map(long value, Mapper[] mappings)
        {
            var mapper = mappings.FirstOrDefault(mapper => IsInRange(value, mapper));

            if (mapper == null)
            {
                return value;
            }

            return Map(value, mapper);
        }

        public long Map(long value, Mapper[][] mapperGroups)
        {
            return mapperGroups.Aggregate(value, Map);
        }

        public long[] ParseSeeds(string line)
        {
            var parts = line.Split(": ");
            var seeds = parts[1].Split(" ").Select(long.Parse).ToArray();
            return seeds;
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

        public record LongRange(long Start, long End);
        public record Mapper(LongRange From, LongRange To, long Diff);
    }
}
