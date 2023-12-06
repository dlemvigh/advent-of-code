using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode2023.Day5
{
    [ProblemName("If You Give A Seed A Fertilizer")]
    public class Day5
    {
        private readonly IInputParser parser;
        private readonly IValueMapper valueMapper;
        private readonly IRangeMapper rangeMapper;

        public Day5(IInputParser? parser = null, IValueMapper? valueMapper = null, IRangeMapper? rangeMapper = null) {
            this.parser = parser ?? new InputParser();
            this.valueMapper = valueMapper ?? new ValueMapper();
            this.rangeMapper = rangeMapper ?? new RangeMapper(this.valueMapper);
        }

        public long Part1(string input)
        {
            var (seeds, mapperGroups) = ParseInput(input);

            var values = seeds.Select(seed => valueMapper.MapValue(seed, mapperGroups));

            return values.Min();
        }

        public long Part2(string input)
        {
            var (seedRanges, mapperGroups) = ParseInput2(input);

            var resultRanges = rangeMapper.MapRanges(seedRanges, mapperGroups);
            var min = resultRanges.Min(range => range.Start);

            return min;

        }

        public (long[] seeds, Mapper[][] mapperGroups) ParseInput(string input)
        {
            var groups = input.Split("\n\n");

            var seeds = parser.ParseSeeds(groups[0]);
            var mapperGroups = parser.ParseMapperGroups(groups.Skip(1));

            return (seeds, mapperGroups);
        }

        public (IEnumerable<LongRange> seedRanges, Mapper[][] mapperGroups) ParseInput2(string input)
        {
            var groups = input.Split("\n\n");

            var seeds = parser.ParseSeedRanges(groups[0]);
            var mapperGroups = parser.ParseMapperGroups(groups.Skip(1));

            return (seeds, mapperGroups);
        }

    }
}
