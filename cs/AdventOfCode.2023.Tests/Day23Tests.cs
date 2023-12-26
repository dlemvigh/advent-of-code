using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day23Tests
    {

        [Theory]
        [FileTestData("Day23/sample.in", 1)]
        [FileTestData("Day23/input.in", 23)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day23();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day23/sample.in", 4)]
        [FileTestData("Day23/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day23();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
