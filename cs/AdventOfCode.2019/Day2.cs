using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019
{
    [ProblemName("1202 Program Alarm")]
    public class Day2
    {
        public int Part1(string input)
        {
            var computer = new Computer(input);
            computer.Memory.WritePos(1, 12);
            computer.Memory.WritePos(2, 02);

            computer.RunTillHalt();

            return computer.Memory.ReadPos(0);
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            return parsed.Last();
            throw new NotImplementedException();

        }
        public IEnumerable<int> ParseInput(string input)
        {
            return input.Split("\n").Select(int.Parse);
        }
    }
}
