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
        void RunStep();
        void RunTillHalt();
    }

    public class Computer : IComputer
    {
        public State State { get; init; }
        public Queue<int> Inputs { get; init; }
        public Queue<int> Outputs { get; init; }

        public IMemory Memory { get; init; }
        public IParser Parser { get; init; }
        public IALU ALU { get; init; }
        
        public Computer (IMemory memory, IParser parser, IALU alu, State state) {
            this.State = state;
            this.Inputs = Inputs ?? new Queue<int>();
            this.Outputs = Outputs ?? new Queue<int>();

            this.Memory = memory ?? throw new ArgumentNullException(nameof(memory));
            this.Parser = parser ?? throw new ArgumentNullException(nameof(parser));
            this.ALU = alu ?? throw new ArgumentException(nameof(alu));
        }

        public Computer(string program) {
            this.State = new State();
            this.Inputs = Inputs ?? new Queue<int>();
            this.Outputs = Outputs ?? new Queue<int>();

            this.Memory = new Memory(program, this.State);
            this.Parser = new Parser(this.Memory, this.State);
            this.ALU = new ALU(this.Memory, this.State, this.Inputs, this.Outputs);
        }

        public void RunStep()
        {
            // read next instruction
            var inst = Parser.ParseNextInstruction();
            State.MemoryAddress += Parser.GetInstructionWidth(inst);

            // execute next instruction
            throw new NotImplementedException();
        }

        public void RunTillHalt()
        {
            // execute RunStep till Halt
            throw new NotImplementedException();
        }

        public Instruction ReadInstruction() {
            return this.Parser.ParseNextInstruction();
        }
    }
}
