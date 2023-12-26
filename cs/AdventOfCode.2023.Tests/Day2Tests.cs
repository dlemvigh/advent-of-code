using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day2Tests
    {

        [Theory]
        [InlineData("1 red", 1, 0, 0)]
        [InlineData("2 green", 0, 2, 0)]
        [InlineData("3 blue", 0, 0, 3)]
        [InlineData("4 blue, 5 green, 6 red", 6, 5, 4)]
        [InlineData("7 green, 8 red, 9 blue", 8, 7, 9)]
        public void ParseDraw(string input, int red, int green, int blue)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.ParseDraw(input);

            // assert
            Assert.Equal(red, actual.Red);
            Assert.Equal(green, actual.Green);
            Assert.Equal(blue, actual.Blue);
        }

        [Theory]
        [InlineData("Game 1: 1 red", 1)]
        [InlineData("Game 5: 1 blue", 5)]
        public void ParseLine_GameID(string input, int expectedGameID)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.ParseLine(input);

            // assert
            Assert.Equal(expectedGameID, actual.ID);
        }

        [Theory]
        [FileTestData("Day2/sample.in", 8)]
        [FileTestData("Day2/input.in", 2776)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day2/sample.in", 2286)]
        [FileTestData("Day2/input.in", 68638)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
