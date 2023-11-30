using AdventOfCode.Y2020;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode.Tests.Y2020
{
    public class Day21Tests
    {
        private readonly Day21 sut = new Day21();

        [Theory]
        [FileTestData("Day21/sample.in", 5)]
        [FileTestData("Day21/input.in", 2061)]
        public void Part1(string input, int expected)
        {
            Assert.Equal(expected, sut.Part1(input));
        }
    }
}
