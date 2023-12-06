using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode
{
    public interface IParser
    {
        public Instruction ParseNextInstruction(IMemory memory, State state);
        public int GetInstructionWidth(Instruction instruction);
    }

    public class Parser : IParser
    {
        public Instruction ParseNextInstruction(IMemory memory, State state)
        {
            var opcode = memory.ReadPos(state.MemoryAddress);

            var op = (Op)(opcode % 100);
            var modes = new[]
            {
                (Mode)((opcode / 100 % 10)),
                (Mode)((opcode / 1000 % 10)),
                (Mode)((opcode / 10000 % 10))
            };
            var args = Enumerable.Range(0, GetArgLength(op)).Select(index =>
            {
                var adr = memory.ReadPos(state.MemoryAddress + index + 1);
                var mode = modes[index];
                return new Arg(adr, mode);
            }).ToArray();

            return new Instruction(op, args);
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

        public int GetInstructionWidth(Instruction instruction)
        {
            return 1 + instruction.args.Length;
        }
    }
}
