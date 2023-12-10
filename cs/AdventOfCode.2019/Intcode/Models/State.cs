using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode
{
    public record State
    {
        public State(bool IsHalted = default, long MemoryAddress = default, long RelativeBase = default) {
            this.IsHalted = IsHalted;
            this.MemoryAddress = MemoryAddress;
            this.RelativeBase = RelativeBase;
        }

        public bool IsHalted { get; internal set; }
        public long MemoryAddress { get; internal set; }
        public long RelativeBase { get; internal set; }
    }
}
