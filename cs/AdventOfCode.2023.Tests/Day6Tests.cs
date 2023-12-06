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
    public class Day6Tests
    {
        [Theory]
        [InlineData(7, 9, 4)]
        [InlineData(15, 40, 8)]
        [InlineData(30, 200, 9)]
        [InlineData(71530, 940200, 71503)]
        public void FindWinningWaitTime(long time, long dist, long expected) {
            // arrange 
            var sut = new Day6();

            // act
            var actual = sut.FindWinningWaitTime(time, dist);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day6/sample.in", 288)]
        [FileTestData("Day6/input.in", 840336)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day6();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day6/sample.in", 71503)]
        [FileTestData("Day6/input.in", 41382569)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day6();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
