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
    public class Day4Tests
    {
        [Theory]
        [InlineData("Game 1: 1 | 0", 1)]
        [InlineData("Game 1: 1 2 | 0", 1, 2)]
        [InlineData("Game 1: 1 2 3 | 0", 1, 2, 3)]
        [InlineData("Game 1:  1  2  3 | 0", 1, 2, 3)]
        public void ParseLine_WinNumbers(string input, params int[] expectedWinNumbers)
        {
            // arrange 
            var sut = new Day4();

            // act
            var actual = sut.ParseLine(input);

            // assert
            Assert.Equal(expectedWinNumbers, actual.win);
        }


        [Theory]
        [FileTestData("Day4/sample.in", 13)]
        [FileTestData("Day4/input.in", 21105)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day4();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day4/sample.in", 30)]
        [FileTestData("Day4/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day4();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
