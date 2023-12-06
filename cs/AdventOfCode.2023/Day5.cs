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
            var (seedRanges, mapperGroups) = ParseInput2(input);

            var resultRanges = Map(seedRanges, mapperGroups);
            var min = resultRanges.Min(range => range.Start);

            return min;

        }
        public (long[] seeds, Mapper[][] mapperGroups) ParseInput(string input)
        {
            var groups = input.Split("\n\n");

            var seeds = ParseSeeds(groups[0]);
            var mapperGroups = ParseMapperGroups(groups.Skip(1));

            return (seeds, mapperGroups);
        }

        public (IEnumerable<LongRange> seedRanges, Mapper[][] mapperGroups) ParseInput2(string input)
        {
            var groups = input.Split("\n\n");

            var seeds = ParseSeedRanges(groups[0]);
            var mapperGroups = ParseMapperGroups(groups.Skip(1));

            return (seeds, mapperGroups);
        }



        public bool IsInRange(long value, Mapper mapper)
        {
            return mapper.From.Start <= value && value <= mapper.From.End;
        }

        public bool IsInRange(LongRange range, Mapper mapper)
        {
            return range.Start <= mapper.From.End && mapper.From.Start <= range.End;
        }

        public long Map(long value, Mapper mapper)
        {
            if (IsInRange(value, mapper))
            {
                return value += mapper.Diff;
            }
            return value;
        }

        public (LongRange? before, LongRange? mapped, LongRange? after) Map(LongRange range, Mapper mapper)
        {
            if (!IsInRange(range, mapper)) {
                return (range, null, null);
            }

            LongRange? before = null, mapped = null, after = null;

            if (range.Start < mapper.From.Start)
            {
                before = new LongRange(range.Start, mapper.From.Start - 1);
            }

            if (IsInRange(range, mapper)) {
                var start = Math.Max(mapper.From.Start, range.Start);
                var end = Math.Min(mapper.From.End, range.End);
                mapped = new LongRange(
                    Map(start, mapper),
                    Map(end, mapper)
                );
            }

            if (mapper.From.End < range.End)
            {
                after = new LongRange(mapper.From.End + 1, range.End);
            }

            return (before, mapped, after);
        }

        public IEnumerable<LongRange> Map(IEnumerable<LongRange> ranges, Mapper[] mappers)
        {
            var unmappedRanges = new Queue<LongRange>(ranges);
            var mappedRanges = new Queue<LongRange>();

            while(unmappedRanges.Count > 0)
            {
                var range = unmappedRanges.Dequeue();
                var mapper = mappers.FirstOrDefault(mapper => IsInRange(range, mapper));

                if (mapper == null)
                {
                    mappedRanges.Enqueue(range);
                    continue;
                }

                var (before, mapped, after) = Map(range, mapper);
                if (before != null)
                {
                    unmappedRanges.Enqueue(before);
                }
                if (mapped != null)
                {
                    mappedRanges.Enqueue(mapped);
                }
                if (after != null)
                {
                    unmappedRanges.Enqueue(after);
                }
            }

            return mappedRanges;
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

        public IEnumerable<LongRange> Map(IEnumerable<LongRange> ranges, Mapper[][] mapperGroups)
        {
            return mapperGroups.Aggregate(ranges, Map);
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

        public IEnumerable<LongRange> ParseSeedRanges(string line)
        {
            var parts = line.Split(": ");
            var values = parts[1].Split(" ").Select(long.Parse);
            var seedRanges = values.Chunk(2).Select(pair => {
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

        public record LongRange(long Start, long End);
        public record Mapper(LongRange From, LongRange To, long Diff);
    }
}
