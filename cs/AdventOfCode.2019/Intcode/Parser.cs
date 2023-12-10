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
        public int GetInstructionWidth(Instruction inst);
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

            var arg = (int index) => {
                var adr = memory.ReadPos(state.MemoryAddress + index + 1);
                var mode = modes[index];
                return new Arg(adr, mode);
            };

            switch (op) {
                case Op.ADD: return new AddInstruction(arg(0), arg(1), arg(2));
                case Op.MUL: return new MultiplyInstruction(arg(0), arg(1), arg(2));
                case Op.IN: return new InputInstruction(arg(0));
                case Op.OUT: return new OutputInstruction(arg(0));
                case Op.JUMP_TRUE: return new JumpTrueInstruction(arg(0), arg(1));
                case Op.JUMP_FALSE: return new JumpFalseInstruction(arg(0), arg(1));
                case Op.LESS: return new LessThanInstruction(arg(0), arg(1), arg(2));
                case Op.EQUAL: return new EqualToInstruction(arg(0), arg(1), arg(2));
                case Op.ADJ_REL_BASE: return new AdjustRelativeBaseInstruction(arg(0));
                case Op.HALT: return new HaltInstruction();
                default: throw new ArgumentException("Unknown operation");
            }
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

        public int GetInstructionWidth(Instruction inst) {
            return 1 + GetArgLength(inst.Op);
        }
    }
}
