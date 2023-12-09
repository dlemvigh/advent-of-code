using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Intcode
{
    public interface IComputer {
        Instruction RunStep();
        void RunTillHalt();
    }

    public class Computer : IComputer
    {
        public State State { get; init; }
        public Queue<long> Inputs { get; init; }
        public Queue<long> Outputs { get; init; }

        public IMemory Memory { get; init; }
        public IParser Parser { get; init; }
        public IALU ALU { get; init; }
        
        public Computer (IMemory memory, IParser parser, IALU alu, State state) {
            this.State = state;
            this.Inputs = Inputs ?? new Queue<long>();
            this.Outputs = Outputs ?? new Queue<long>();

            this.Memory = memory ?? throw new ArgumentNullException(nameof(memory));
            this.Parser = parser ?? throw new ArgumentNullException(nameof(parser));
            this.ALU = alu ?? throw new ArgumentException(nameof(alu));
        }

        public Computer(string program) {
            this.State = new State();
            this.Inputs = Inputs ?? new Queue<long>();
            this.Outputs = Outputs ?? new Queue<long>();

            this.Memory = new Memory(program, this.State);
            this.Parser = new Parser(this.Memory, this.State);
            this.ALU = new ALU(this.Memory, this.State, this.Inputs, this.Outputs);
        }

        public Instruction RunStep()
        {
            var inst = Parser.ParseNextInstruction();
            State.MemoryAddress += Parser.GetInstructionWidth(inst);
            ALU.ExecuteInstruction(inst);

            return inst;
        }

        public void RunTillHaltOrOutput()
        {
            var running = true;
            while (running)
            {
                var inst = RunStep();
                if (inst.op == Op.HALT || inst.op == Op.OUT)
                {
                    running = false;
                }
            }
        }

        public void RunTillHalt()
        {
            var running = true;
            while (running)
            {
                var inst = RunStep();
                if (inst.op == Op.HALT)
                {
                    running = false;
                }
            }
        }
    }
}
