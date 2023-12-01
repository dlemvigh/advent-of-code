using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;

namespace AdventOfCode2023.Tests
{
    public class Day1Tests
    {

        [Theory]
        [InlineData("1", 1)]
        [InlineData("1\n2", 1)]
        [InlineData("1\n2\n\n0", 1)]
        [InlineData("1\n2\n\n9", 1)]
        [FileTestData("DayX/sample.in", 1)]
        [FileTestData("DayX/input.in", 23)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day1();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("1", 1)]
        [InlineData("1\n2", 2)]
        [InlineData("1\n2\n\n0", 0)]
        [InlineData("1\n2\n\n9", 9)]
        [FileTestData("DayX/sample.in", 4)]
        [FileTestData("DayX/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day1();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
