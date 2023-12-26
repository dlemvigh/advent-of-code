using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day3Tests
    {
        [Fact]
        public void FindAllSymbols()
        {
            // arrange 
            var sut = new Day3();
            var input = FileTestData.GetTestData("Day3/sample.in");

            // act
            var parsed = sut.ParseInput(input);
            var actual = sut.FindAllSymbols(parsed);

            // assert
            Assert.Contains(new Day3.Symbol('*', 1, 3), actual);
            Assert.Contains(new Day3.Symbol('#', 3, 6), actual);
            Assert.Contains(new Day3.Symbol('*', 4, 3), actual);
            Assert.Contains(new Day3.Symbol('+', 5, 5), actual);
            Assert.Contains(new Day3.Symbol('$', 8, 3), actual);
            Assert.Contains(new Day3.Symbol('*', 8, 5), actual);
            Assert.Equal(6, actual.Count());
        }

        [Theory]
        [InlineData(".", 0, 0, null)]
        [InlineData("#", 0, 0, null)]
        [InlineData("$", 0, 0, null)]
        [InlineData("+", 0, 0, null)]
        [InlineData("1", 0, 0, 1)]
        [InlineData("123", 0, 0, 123)]
        [InlineData("123", 0, 1, 123)]
        [InlineData("123", 0, 2, 123)]
        [InlineData("1.3", 0, 0, 1)]
        [InlineData("1.3", 0, 1, null)]
        [InlineData("1.3", 0, 2, 3)]
        [InlineData("1#3", 0, 0, 1)]
        [InlineData("1#3", 0, 1, null)]
        [InlineData("1#3", 0, 2, 3)]
        public void FindMachineNumber(string line, int row, int col, int? expected)
        {
            // arrange 
            var sut = new Day3();

            // act
            var actual = sut.FindMachineNumber(line, row, col);

            // assert
            if (expected == null)
            {
                Assert.Null(actual);
            }
            else
            {
                Assert.NotNull(actual);
                Assert.Equal(expected, actual.number);
            }
        }


        [Theory]
        [FileTestData("Day3/sample.in", 4361)]
        [FileTestData("Day3/input.in", 539713)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day3();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day3/sample.in", 467835)]
        [FileTestData("Day3/input.in", 84159075)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day3();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
