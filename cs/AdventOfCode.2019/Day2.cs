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
            return RunProgram(input, 12, 2);
        }

        public int Part2(string input, int target)
        {
            for (var noun = 0; noun < 100; noun++)
            {
                for (var verb = 0; verb < 100; verb++)
                {
                    if (RunProgram(input, noun, verb) == target)
                    {
                        return 100 * noun + verb;
                    }
                }
            }
            throw new Exception("No noun/verb combination matched expected value");
        }

        public int RunProgram(string program, int noun, int verb)
        {
            var computer = new Computer(program);
            computer.Memory.WritePos(1, noun);
            computer.Memory.WritePos(2, verb);

            computer.RunTillHalt();

            return computer.Memory.ReadPos(0);
        }
    }
}
