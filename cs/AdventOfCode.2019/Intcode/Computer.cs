using System;
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
        public IMemory Memory { get; init; }
        public IParser Parser { get; init; }
        public State State { get; init; }

        public Computer (IMemory memory, IParser parser, State state) {
            this.Memory = memory ?? throw new ArgumentNullException(nameof(memory));
            this.Parser = parser ?? throw new ArgumentNullException(nameof(parser));
            this.State = state;
        }

        public Computer(string program) {
            this.State = new State();
            this.Memory = new Memory(program, this.State);
            this.Parser = new Parser();
        }

        public void RunStep()
        {
            // read next instruction
            // execute next instruction
            throw new NotImplementedException();
        }

        public void RunTillHalt()
        {
            // execute RunStep till Halt
            throw new NotImplementedException();
        }

        public Instruction ReadInstruction() {
            return this.Parser.ParseNextInstruction(this.Memory, this.State);
        }
    }
}
