using System.Collections.Concurrent;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Intcode {
    public interface IALU {
        public void ExecuteInstruction(Instruction inst);
    }

    public class ALU : IALU {        
        private readonly IMemory memory;
        private readonly State state;
        private readonly Queue<int> inputs;
        private readonly Queue<int> outputs;

        public ALU(IMemory memory, State state, Queue<int> inputs, Queue<int> outputs) {
            this.memory = memory;
            this.state = state;
            this.inputs = inputs;
            this.outputs = outputs;
        }

        public void ExecuteInstruction(Instruction inst) {
            var args = inst.inputs.Select(memory.Read).ToArray();
            state.MemoryAddress += GetInstructionWidth(inst);

            switch(inst.op) {
                case Op.ADD:
                    memory.Write(inst.output!, args[0] + args[1]);
                    break;
                case Op.MUL:
                    memory.Write(inst.output!, args[0] * args[1]);
                    break;
                case Op.JUMP_TRUE:
                    if (args[0] != 0) {
                        state.MemoryAddress = args[1];
                    }
                    break;
                case Op.JUMP_FALSE:
                    if (args[0] == 0) {
                        state.MemoryAddress = args[1];
                    }
                    break;
                case Op.LESS:
                    memory.Write(inst.output!, args[0] < args[1] ? 1 : 0);
                    break;
                case Op.EQUAL:
                    memory.Write(inst.output!, args[0] == args[1] ? 1 : 0);
                    break;
                case Op.ADJ_REL_BASE:
                    memory.UpdateRelBase(args[0]);
                    break;
                case Op.IN:
                    memory.Write(inst.output!, inputs.Dequeue());
                    break;
                case Op.OUT:
                    outputs.Enqueue(args[0]);
                    break;
                default:
                    throw new NotImplementedException("Operation is not implemented yet");
            }
        }

        public int GetInstructionWidth(Instruction inst) {
            return 1 + inst.inputs.Length + (inst.output == null ? 0 : 1);
        }
    }
}