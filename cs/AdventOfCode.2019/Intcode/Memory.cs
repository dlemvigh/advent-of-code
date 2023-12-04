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
        int Read(int adr, Mode mode);
        int ReadPos(int adr);
        int ReadRel(int adr);
        void Write(int adr, Mode mode, int value);
        void WritePos(int adr, int value);
        void WriteRel(int adr, int value);
        void UpdateRelBase(int value);
    }

    public class Memory : IMemory
    {
        public State State { get; private set; }
        internal int[] Program { get; init; }

        public Memory(string program, State state) 
        {
            this.Program = program.Split(" ").Select(int.Parse).ToArray();
            this.State = state ?? new State();
        }

        public int Read(int adr, Mode mode)
        {
            switch(mode)
            {
                case Mode.POS: return ReadPos(adr);
                case Mode.IM: return adr;
                case Mode.REL: return ReadRel(adr);
                default: throw new ArgumentException("Unknown read mode", nameof(mode));
            }
        }

        public int ReadPos(int adr) {
            return Program[adr];
        }

        public int ReadRel(int adr) {
            return Program[adr + State.RelativeBase];
        }

        public void Write(int adr, Mode mode, int value)
        {
            switch (mode)
            {
                case Mode.POS:
                    WritePos(adr, value);
                    break;
                case Mode.REL: 
                    WriteRel(adr, value);
                    break;
                default: 
                    throw new ArgumentException("Unknown read mode", nameof(mode));
            }

        }

        public void WritePos(int adr, int value)
        {
            Program[adr] = value;
        }

        public void WriteRel(int adr, int value)
        {
            Program[adr + State.RelativeBase] = value;
        }

        public void UpdateRelBase(int value)
        {
            State.RelativeBase += value;
        }
    }
}


