using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day5
{
    public interface IValueMapper
    {
        bool IsInRange(long value, Mapper mapper);
        long MapValue(long value, Mapper mapper);
        long MapValue(long value, Mapper[] mappings);
        long MapValue(long value, Mapper[][] mapperGroups);
    }

    public class ValueMapper : IValueMapper
    {
        public bool IsInRange(long value, Mapper mapper)
        {
            return mapper.From.Start <= value && value <= mapper.From.End;
        }

        public long MapValue(long value, Mapper mapper)
        {
            if (IsInRange(value, mapper))
            {
                return value += mapper.Diff;
            }
            return value;
        }

        public long MapValue(long value, Mapper[] mappings)
        {
            var mapper = mappings.FirstOrDefault(mapper => IsInRange(value, mapper));

            if (mapper == null)
            {
                return value;
            }

            return MapValue(value, mapper);
        }

        public long MapValue(long value, Mapper[][] mapperGroups)
        {
            return mapperGroups.Aggregate(value, MapValue);
        }
    }
}
