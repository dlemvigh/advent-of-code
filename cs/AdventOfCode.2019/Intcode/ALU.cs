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
            switch (inst.op)
            {
                case Op.ADD:
                    ExecuteAdd(inst);
                    break;
                case Op.MUL:
                    ExecuteMultiply(inst);
                    break;
                case Op.JUMP_TRUE:
                    ExecuteJumpTrue(inst);
                    break;
                case Op.JUMP_FALSE:
                    ExecuteJumpFalse(inst);
                    break;
                case Op.LESS:
                    ExecuteLessThan(inst);
                    break;
                case Op.EQUAL:
                    ExecuteEquals(inst);
                    break;
                case Op.ADJ_REL_BASE:
                    ExecuteUpdateRelBase(inst);
                    break;
                case Op.IN:
                    ExecuteInput(inst);
                    break;
                case Op.OUT:
                    ExecuteOutput(inst);
                    break;
                case Op.HALT:
                    ExecuteHalt(inst);
                    break;
                default:
                    throw new NotImplementedException("Operation is not implemented yet");
            }
        }

        public void ExecuteAdd(Instruction inst)
        {
            var a = memory.Read(inst.inputs[0]);
            var b = memory.Read(inst.inputs[1]);
            memory.Write(inst.output!, a + b);
        }

        public void ExecuteMultiply(Instruction inst)
        {
            var a = memory.Read(inst.inputs[0]);
            var b = memory.Read(inst.inputs[1]);
            memory.Write(inst.output!, a * b);
        }

        public void ExecuteJumpTrue(Instruction inst)
        {
            var cond = memory.Read(inst.inputs[0]);
            var adr = memory.Read(inst.inputs[1]);
            if (cond != 0)
            {
                state.MemoryAddress = adr;
            }
        }

        public void ExecuteJumpFalse(Instruction inst)
        {
            var cond = memory.Read(inst.inputs[0]);
            var adr = memory.Read(inst.inputs[1]);
            if (cond == 0)
            {
                state.MemoryAddress = adr;
            }
        }

        public void ExecuteLessThan(Instruction inst)
        {
            var a = memory.Read(inst.inputs[0]);
            var b = memory.Read(inst.inputs[1]);
            memory.Write(inst.output!, a < b ? 1 : 0);
        }

        public void ExecuteEquals(Instruction inst)
        {
            var a = memory.Read(inst.inputs[0]);
            var b = memory.Read(inst.inputs[1]);
            memory.Write(inst.output!, a == b ? 1 : 0);
        }

        public void ExecuteUpdateRelBase(Instruction inst)
        {
            var value = memory.Read(inst.inputs[0]);
            memory.UpdateRelBase(value);
        }

        public void ExecuteInput(Instruction inst)
        {
            var value = inputs.Dequeue();
            memory.Write(inst.output!, value);
        }

        public void ExecuteOutput(Instruction inst)
        {
            var value = memory.Read(inst.inputs[0]);
            outputs.Enqueue(value);
        }

        public void ExecuteHalt(Instruction inst)
        {
            state.IsHalted = true;
        }
    }
}
