using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Y2022;

namespace AdventOfCode.Tests.Y2022
{
    public class Day1Tests
    {

        [Theory]
        [InlineData("1", 1)]
        [InlineData("1\n2", 3)]
        [InlineData("1\n2\n\n0", 3)]
        [InlineData("1\n2\n\n9", 9)]
        [FileTestData("Day1/sample.in", 24000)]
        [FileTestData("Day1/input.in", 70374)]
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
        [InlineData("1\n2", 3)]
        [InlineData("1\n2\n\n0", 3)]
        [InlineData("1\n2\n\n9", 12)]
        [FileTestData("Day1/sample.in", 45000)]
        [FileTestData("Day1/input.in", 204610)]
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
