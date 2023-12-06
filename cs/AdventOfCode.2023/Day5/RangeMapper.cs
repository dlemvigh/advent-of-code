using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day5
{
    public interface IRangeMapper
    {
        bool IsInRange(LongRange range, Mapper mapper);
        (LongRange? before, LongRange? mapped, LongRange? after) MapRange(LongRange range, Mapper mapper);
        IEnumerable<LongRange> MapRanges(IEnumerable<LongRange> ranges, Mapper[] mappers);
        IEnumerable<LongRange> MapRanges(IEnumerable<LongRange> ranges, Mapper[][] mapperGroups);
    }

    public class RangeMapper : IRangeMapper
    {
        private readonly IValueMapper valueMapper;

        public RangeMapper(IValueMapper? valueMapper = null)
        {
            this.valueMapper = valueMapper ?? new ValueMapper();
        }

        public bool IsInRange(LongRange range, Mapper mapper)
        {
            return range.Start <= mapper.From.End && mapper.From.Start <= range.End;
        }

        public (LongRange? before, LongRange? mapped, LongRange? after) MapRange(LongRange range, Mapper mapper)
        {
            if (!IsInRange(range, mapper))
            {
                return (range, null, null);
            }

            LongRange? before = null, mapped = null, after = null;

            if (range.Start < mapper.From.Start)
            {
                before = new LongRange(range.Start, mapper.From.Start - 1);
            }

            if (IsInRange(range, mapper))
            {
                var start = Math.Max(mapper.From.Start, range.Start);
                var end = Math.Min(mapper.From.End, range.End);
                mapped = new LongRange(
                    valueMapper.MapValue(start, mapper),
                    valueMapper.MapValue(end, mapper)
                );
            }

            if (mapper.From.End < range.End)
            {
                after = new LongRange(mapper.From.End + 1, range.End);
            }

            return (before, mapped, after);
        }

        public IEnumerable<LongRange> MapRanges(IEnumerable<LongRange> ranges, Mapper[] mappers)
        {
            var unmappedRanges = new Queue<LongRange>(ranges);
            var mappedRanges = new Queue<LongRange>();

            while (unmappedRanges.Count > 0)
            {
                var range = unmappedRanges.Dequeue();
                var mapper = mappers.FirstOrDefault(mapper => IsInRange(range, mapper));

                if (mapper == null)
                {
                    mappedRanges.Enqueue(range);
                    continue;
                }

                var (before, mapped, after) = MapRange(range, mapper);
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

        public IEnumerable<LongRange> MapRanges(IEnumerable<LongRange> ranges, Mapper[][] mapperGroups)
        {
            return mapperGroups.Aggregate(ranges, MapRanges);
        }
    }
}
