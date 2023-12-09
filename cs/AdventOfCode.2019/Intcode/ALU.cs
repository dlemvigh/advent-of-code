using System.Collections.Concurrent;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Intcode
{
    public interface IALU
    {
        public void ExecuteInstruction(Instruction inst);
    }

    public class ALU : IALU
    {
        private readonly IMemory memory;
        private readonly State state;
        private readonly Queue<long> inputs;
        private readonly Queue<long> outputs;

        public ALU(IMemory memory, State state, Queue<long> inputs, Queue<long> outputs)
        {
            this.memory = memory;
            this.state = state;
            this.inputs = inputs;
            this.outputs = outputs;
        }

        public void ExecuteInstruction(Instruction inst)
        {
            switch (inst)
            {
                case AddInstruction addInst:
                    ExecuteAdd(addInst);
                    break;
                case MultiplyInstruction mulInst:
                    ExecuteMultiply(mulInst);
                    break;
                case JumpTrueInstruction jtInst:
                    ExecuteJumpTrue(jtInst);
                    break;
                case JumpFalseInstruction jfInst:
                    ExecuteJumpFalse(jfInst);
                    break;
                case LessThanInstruction ltInst:
                    ExecuteLessThan(ltInst);
                    break;
                case EqualToInstruction eqInst:
                    ExecuteEquals(eqInst);
                    break;
                case InputInstruction inInst:
                    ExecuteInput(inInst);
                    break;
                case OutputInstruction outInst:
                    ExecuteOutput(outInst);
                    break;
                case AdjustRelativeBaseInstruction arbInst:
                    ExecuteUpdateRelBase(arbInst);
                    break;
                case HaltInstruction haltInst:
                    ExecuteHalt(haltInst);
                    break;
                default:
                    throw new ArgumentException("Unknown instruction type");
            }
        }

        public void ExecuteAdd(AddInstruction inst)
        {
            var a = memory.Read(inst.A);
            var b = memory.Read(inst.B);
            memory.Write(inst.C, a + b);
        }

        public void ExecuteMultiply(MultiplyInstruction inst)
        {
            var a = memory.Read(inst.A);
            var b = memory.Read(inst.B);
            memory.Write(inst.C, a * b);
        }

        public void ExecuteJumpTrue(JumpTrueInstruction inst)
        {
            var cond = memory.Read(inst.A);
            var adr = memory.Read(inst.B);
            if (cond != 0)
            {
                state.MemoryAddress = adr;
            }
        }

        public void ExecuteJumpFalse(JumpFalseInstruction inst)
        {
            var cond = memory.Read(inst.A);
            var adr = memory.Read(inst.B);
            if (cond == 0)
            {
                state.MemoryAddress = adr;
            }
        }

        public void ExecuteLessThan(LessThanInstruction inst)
        {
            var a = memory.Read(inst.A);
            var b = memory.Read(inst.B);
            memory.Write(inst.C, a < b ? 1 : 0);
        }

        public void ExecuteEquals(EqualToInstruction inst)
        {
            var a = memory.Read(inst.A);
            var b = memory.Read(inst.B);
            memory.Write(inst.C, a == b ? 1 : 0);
        }

        public void ExecuteUpdateRelBase(AdjustRelativeBaseInstruction inst)
        {
            var value = memory.Read(inst.A);
            memory.UpdateRelBase(value);
        }

        public void ExecuteInput(InputInstruction inst)
        {
            var value = inputs.Dequeue();
            memory.Write(inst.A, value);
        }

        public void ExecuteOutput(OutputInstruction inst)
        {
            var value = memory.Read(inst.A);
            outputs.Enqueue(value);
        }

        public void ExecuteHalt(HaltInstruction inst)
        {
            state.IsHalted = true;
        }

    }
}
