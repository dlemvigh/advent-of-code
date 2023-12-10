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
        long Read(Arg arg);
        long Read(long adr, Mode mode);
        long ReadPos(long adr);
        long ReadRel(long adr);
    }
    public interface IMemory : IReadOnlyMemory
    {
        void Write(Arg arg, long value);
        void Write(long adr, Mode mode, long value);
        void WritePos(long adr, long value);
        void WriteRel(long adr, long value);
        void UpdateRelBase(long value);
    }

    public class Memory : IMemory
    {
        public State State { get; }
        public long[] InitialMemory { get; }
        public Dictionary<long, long> ExtendedMemory { get; }

        public Memory(string program, State state) 
        {
            this.State = state;

            this.InitialMemory = program.Split(new[] {' ', ',' })
                .Select(long.Parse)
                .ToArray();

            this.ExtendedMemory = new Dictionary<long, long>();
        }

        public long Read(Arg arg) 
        {
            return Read(arg.adr, arg.mode);
        }

        public long Read(long adr, Mode mode)
        {
            switch(mode)
            {
                case Mode.POS: return ReadPos(adr);
                case Mode.IM: return adr;
                case Mode.REL: return ReadRel(adr);
                default: throw new ArgumentException("Unknown read mode", nameof(mode));
            }
        }

        public long ReadPos(long adr) {
            if (adr < 0) throw new ArgumentException("Negative memory address", nameof(adr));
            if (adr < InitialMemory.Length) return InitialMemory[adr];
            if (ExtendedMemory.ContainsKey(adr)) return ExtendedMemory[adr];
            return 0;
        }

        public long ReadRel(long adr) {
            return ReadPos(adr + State.RelativeBase);
        }

        public void Write(Arg arg, long value) {
            Write(arg.adr, arg.mode, value);
        }
        public void Write(long adr, Mode mode, long value)
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

        public void WritePos(long adr, long value)
        {
            if (adr < 0) throw new ArgumentException("Negative memory address", nameof(adr));
            if (adr < InitialMemory.Length) InitialMemory[adr] = value;
            else ExtendedMemory[adr] = value;
        }

        public void WriteRel(long adr, long value)
        {
            WritePos(adr + State.RelativeBase, value);
        }

        public void UpdateRelBase(long value)
        {
            State.RelativeBase += value;
        }
    }
}


