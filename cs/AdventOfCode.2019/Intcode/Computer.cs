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
        public State State { get; }
        public Queue<long> Inputs { get; }
        public Queue<long> Outputs { get; }

        public IMemory Memory { get; }
        public IParser Parser { get; }
        public IALU ALU { get; }
        
        public Computer (IMemory memory, IParser parser, IALU alu, State state) {
            this.Inputs = new Queue<long>();
            this.Outputs = new Queue<long>();

            this.State = state ?? throw new ArgumentException(nameof(state));
            this.Memory = memory ?? throw new ArgumentNullException(nameof(memory));
            this.Parser = parser ?? throw new ArgumentNullException(nameof(parser));
            this.ALU = alu ?? throw new ArgumentException(nameof(alu));
        }

        public Computer(string program) {
            this.Inputs = new Queue<long>();
            this.Outputs = new Queue<long>();

            this.State = new State();
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
                if (inst.Op == Op.HALT || inst.Op == Op.OUT)
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
                if (inst.Op == Op.HALT)
                {
                    running = false;
                }
            }
        }
    }
}
