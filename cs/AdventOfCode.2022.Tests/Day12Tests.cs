using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Y2022;

namespace AdventOfCode.Tests.Y2022
{
    public class Day12Tests
    {
        private readonly Day12 sut = new Day12();

        [Theory]
        [FileTestData("Day12/sample.in", 31)]
        [FileTestData("Day12/input.in", 490)]
        public void Part1(string input, int expected)
        {
            Assert.Equal(expected, sut.Part1(input));
        }

        [Theory]
        [FileTestData("Day12/sample.in", 29)]
        [FileTestData("Day12/input.in", 488)]
        public void Part2(string input, int expected)
        {
            Assert.Equal(expected, sut.Part2(input));
        }

        [Theory]
        [InlineData('a', 'a', true)]
        [InlineData('a', 'b', true)]
        [InlineData('a', 'c', false)]
        [InlineData('c', 'c', true)]
        [InlineData('c', 'd', true)]
        [InlineData('c', 'e', false)]
        [InlineData('c', 'b', true)]
        [InlineData('c', 'a', true)]
        [InlineData('S', 'a', true)]
        [InlineData('S', 'b', true)]
        [InlineData('S', 'c', false)]
        [InlineData('z', 'E', true)]
        [InlineData('a', 'E', false)]
        public void Part1_Reachable(char src, char dest, bool expected)
        {
            Assert.Equal(expected, sut.Reachable(src, dest));
        }

    }
}
