using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day_
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            return parsed.First();
            throw new NotImplementedException();
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
