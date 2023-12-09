using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode
{
    public record State
    {
        public bool IsHalted { get; set; }
        public int MemoryAddress { get; set; }
        public int RelativeBase { get; set; }
    }
}
