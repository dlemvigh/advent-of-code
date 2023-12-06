using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Intcode
{
    public interface IParser
    {
        public Instruction ParseNextInstruction();
    }

    public class Parser : IParser
    {
        private readonly IReadOnlyMemory memory;
        private readonly State state;

        public Parser(IReadOnlyMemory memory, State state) {
            this.memory = memory;
            this.state = state;
        }

        public Instruction ParseNextInstruction()
        {
            var opcode = memory.ReadPos(state.MemoryAddress);

            var op = (Op)(opcode % 100);
            var modes = new[]
            {
                (Mode)(opcode / 100 % 10),
                (Mode)(opcode / 1000 % 10),
                (Mode)(opcode / 10000 % 10)
            };

            var argLength = GetArgLength(op);
            var inputLength = GetInputLength(op);
            var hasOutput = GetHasOutput(op);

            var args = Enumerable.Range(0, GetArgLength(op)).Select(index =>
            {
                var adr = memory.ReadPos(state.MemoryAddress + index + 1);
                var mode = modes[index];
                return new Arg(adr, mode);
            });

            var inputs = args.Take(inputLength).ToArray();
            var output = hasOutput ? args.Last() : null;
            
            return new Instruction(op, inputs, output);
        }

        public int GetInputLength(Op op)
        {
            switch(op)
            {
                case Op.ADD:
                case Op.MUL:
                case Op.LESS:
                case Op.EQUAL:
                case Op.JUMP_TRUE:
                case Op.JUMP_FALSE:
                    return 2;
                case Op.OUT:
                case Op.ADJ_REL_BASE:
                    return 1;
                case Op.IN:
                case Op.HALT:
                    return 0;
                default: throw new ArgumentException("Unknown op", nameof(op));
            }
        }

        public bool GetHasOutput(Op op) {
            switch(op)
            {
                case Op.ADD:
                case Op.MUL:
                case Op.LESS:
                case Op.EQUAL:
                case Op.IN:
                    return true;
                case Op.JUMP_TRUE:
                case Op.JUMP_FALSE:
                case Op.OUT:
                case Op.ADJ_REL_BASE:
                case Op.HALT:
                    return false;
                default: throw new ArgumentException("Unknown op", nameof(op));
            }

        }

        public int GetArgLength(Op op)
        {
            switch(op)
            {
                case Op.ADD:
                case Op.MUL:
                case Op.LESS:
                case Op.EQUAL:
                    return 3;
                case Op.JUMP_TRUE:
                case Op.JUMP_FALSE:
                    return 2;
                case Op.IN:
                case Op.OUT:
                case Op.ADJ_REL_BASE:
                    return 1;
                case Op.HALT:
                    return 0;
                default: throw new ArgumentException("Unknown op", nameof(op));
            }
        }
    }
}
