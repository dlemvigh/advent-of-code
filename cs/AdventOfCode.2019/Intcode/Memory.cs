using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode
{
    public interface IMemory
    {
    }

    public class Memory : IMemory
    {
        internal int RelBase { get; }
        internal int[] Program { get; init; }

        public Memory(IEnumerable<int> program)
        {
            this.Program = program.ToArray();
        }

        public Memory(string program) 
        {
            this.Program = program.Split(" ").Select(int.Parse).ToArray();
        }

        public int Read(int param, Mode mode)
        {
            switch(mode)
            {
                case Mode.POS: return Program[param];
                case Mode.IM: return param;
                case Mode.REL: return Program[param + this.RelBase];
                default: throw new ArgumentException("Unknown read mode", nameof(mode));
            }
        }

        public void Write(int value, int param, Mode mode)
        {
            switch (mode)
            {
                case Mode.POS:
                    Program[param] = value;
                    break;
                case Mode.REL: 
                    Program[param + this.RelBase] = value;
                    break;
                default: 
                    throw new ArgumentException("Unknown read mode", nameof(mode));
            }

        }
    }
}


