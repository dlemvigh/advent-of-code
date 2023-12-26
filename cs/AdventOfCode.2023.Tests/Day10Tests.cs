using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;
using AdventOfCode2023;

namespace AdventOfCode2023.Tests
{
    public class Day10Tests
    {
        [Theory]
        [InlineData(0, 0, Day10.Direction.Up, -1, 0)]
        [InlineData(0, 0, Day10.Direction.Down, 1, 0)]
        [InlineData(0, 0, Day10.Direction.Right, 0, 1)]
        [InlineData(0, 0, Day10.Direction.Left, 0, -1)]
        public void GetNextPosition(int row, int col, Day10.Direction dir, int expectedRow, int expectedCol) 
        {
            // arrange 
            var expected = (expectedRow, expectedCol);
            var sut = new Day10();

            // act
            var actual = sut.GetNextPosition(row, col, dir);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day10/sample1.in", 4)]
        [FileTestData("Day10/sample2.in", 8)]
        [FileTestData("Day10/input.in", 7173)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day10();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day10/sample1.in", 1 )]
        [FileTestData("Day10/sample2.in", 1)]
        [FileTestData("Day10/sample3.in", 4)]
        [FileTestData("Day10/sample4.in", 8)]
        [FileTestData("Day10/sample5.in", 4)]
        [FileTestData("Day10/sample6.in", 4)]
        [FileTestData("Day10/sample7.in", 1)]
        [FileTestData("Day10/input.in", 291)] // 284 too low
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day10();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
