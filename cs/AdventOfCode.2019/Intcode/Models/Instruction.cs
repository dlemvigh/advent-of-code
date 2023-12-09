using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode.Models
{
    // public record Instruction(Op op, Arg[] inputs, Arg? output = null);
    public record Arg(long adr, Mode mode);

    public abstract record Instruction 
    {
        public Op Op { get; init; }

        protected Instruction(Op op)
        {
            Op = op;
        }
    }

    public abstract record InstructionOneArg : Instruction
    {
        public Arg A { get; init; }

        protected InstructionOneArg(Op op, Arg a) : base(op)
        {
            A = a;
        }
    }

    public abstract record InstructionTwoArgs : InstructionOneArg
    {
        public Arg B { get; init; }

        protected InstructionTwoArgs(Op op, Arg a, Arg b) : base(op, a)
        {
            B = b;
        }
    }

    public abstract record InstructionThreeArgs : InstructionTwoArgs
    {
        public Arg C { get; init; }

        protected InstructionThreeArgs(Op op, Arg a, Arg b, Arg c) : base(op, a, b)
        {
            C = c;
        }
    }

    public record AddInstruction : InstructionThreeArgs
    {
        public AddInstruction(Arg a, Arg b, Arg c) : base(Op.ADD, a, b, c) { }
    }
    public record MultiplyInstruction : InstructionThreeArgs
    {
        public MultiplyInstruction(Arg a, Arg b, Arg c) : base(Op.MUL, a, b, c) { }
    }
    public record InputInstruction : InstructionOneArg {
        public InputInstruction(Arg a) : base(Op.IN, a) {}
    }
    public record OutputInstruction : InstructionOneArg {
        public OutputInstruction(Arg a) : base(Op.OUT, a) {}
    }
    public record JumpTrueInstruction : InstructionTwoArgs {
        public JumpTrueInstruction(Arg a, Arg b) : base(Op.JUMP_TRUE, a, b) {}
    }
    public record JumpFalseInstruction : InstructionTwoArgs {
        public JumpFalseInstruction(Arg a, Arg b) : base(Op.JUMP_FALSE, a, b) {}
    }
    public record LessThanInstruction : InstructionThreeArgs {
        public LessThanInstruction(Arg a, Arg b, Arg c) : base(Op.LESS, a, b, c) { }
    }
    public record EqualToInstruction : InstructionThreeArgs {
        public EqualToInstruction(Arg a, Arg b, Arg c) : base(Op.EQUAL, a, b, c) { }
    }
    public record AdjustRelativeBaseInstruction : InstructionOneArg {
        public AdjustRelativeBaseInstruction(Arg a) : base(Op.IN, a) {}
    }
    public record HaltInstruction : Instruction {
        public HaltInstruction() : base(Op.HALT) {}
    }
}
