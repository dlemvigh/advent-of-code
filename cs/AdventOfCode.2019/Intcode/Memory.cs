using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Intcode
{
    public interface IReadOnlyMemory {
        int Read(Arg arg);
        int Read(int adr, Mode mode);
        int ReadPos(int adr);
        int ReadRel(int adr);
    }
    public interface IMemory : IReadOnlyMemory
    {
        void Write(Arg arg, int value);
        void Write(int adr, Mode mode, int value);
        void WritePos(int adr, int value);
        void WriteRel(int adr, int value);
        void UpdateRelBase(int value);
    }

    public class Memory : IMemory
    {
        public State State { get; init; }
        public int[] Program { get; init; }

        public Memory(string program, State? state = null) 
        {
            this.Program = program.Split(new[] {' ', ',' }).Select(int.Parse).ToArray();
            this.State = state ?? new State();
        }

        public int Read(Arg arg) 
        {
            return Read(arg.adr, arg.mode);
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
            try {
                return Program[adr];
            } catch (IndexOutOfRangeException) {
                return 0;
            }
        }

        public int ReadRel(int adr) {
            try {
            return Program[adr + State.RelativeBase];
            } catch (IndexOutOfRangeException) {
                return 0;
            }
        }

        public void Write(Arg arg, int value) {
            Write(arg.adr, arg.mode, value);
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


