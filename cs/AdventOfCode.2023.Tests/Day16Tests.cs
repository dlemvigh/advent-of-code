using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day16Tests
    {
        [Theory]
        [InlineData(0, 0, Day16.Dir.Up, -1, 0)]
        [InlineData(0, 0, Day16.Dir.Down, 1, 0)]
        [InlineData(0, 0, Day16.Dir.Left, 0, -1)]
        [InlineData(0, 0, Day16.Dir.Right, 0, 1)]
        public void GetNextPos(int row, int col, Day16.Dir dir, int expectedRow, int expectedCol)
        {
            // arrange 
            var sut = new Day16();
            var expected = (expectedRow, expectedCol);

            // act
            var actual = sut.GetNextPos(row, col, dir);

            // assert

            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(Day16.Tile.Empty, Day16.Dir.Up, new Day16.Dir[] { Day16.Dir.Up })]
        [InlineData(Day16.Tile.Empty, Day16.Dir.Down, new Day16.Dir[] { Day16.Dir.Down })]
        [InlineData(Day16.Tile.Empty, Day16.Dir.Left, new Day16.Dir[] { Day16.Dir.Left })]
        [InlineData(Day16.Tile.Empty, Day16.Dir.Right, new Day16.Dir[] { Day16.Dir.Right })]
        [InlineData(Day16.Tile.PrismVertical, Day16.Dir.Up, new Day16.Dir[] { Day16.Dir.Up})]
        [InlineData(Day16.Tile.PrismVertical, Day16.Dir.Down, new Day16.Dir[] { Day16.Dir.Down })]
        [InlineData(Day16.Tile.PrismVertical, Day16.Dir.Left, new Day16.Dir[] { Day16.Dir.Up, Day16.Dir.Down })]
        [InlineData(Day16.Tile.PrismVertical, Day16.Dir.Right, new Day16.Dir[] { Day16.Dir.Up, Day16.Dir.Down })]
        [InlineData(Day16.Tile.PrismHorizontal, Day16.Dir.Up, new Day16.Dir[] { Day16.Dir.Left, Day16.Dir.Right })]
        [InlineData(Day16.Tile.PrismHorizontal, Day16.Dir.Down, new Day16.Dir[] { Day16.Dir.Left, Day16.Dir.Right })]
        [InlineData(Day16.Tile.PrismHorizontal, Day16.Dir.Left, new Day16.Dir[] { Day16.Dir.Left })]
        [InlineData(Day16.Tile.PrismHorizontal, Day16.Dir.Right, new Day16.Dir[] { Day16.Dir.Right })]
        [InlineData(Day16.Tile.MirrorSlash, Day16.Dir.Up, new Day16.Dir[] { Day16.Dir.Right })]
        [InlineData(Day16.Tile.MirrorSlash, Day16.Dir.Down, new Day16.Dir[] { Day16.Dir.Left })]
        [InlineData(Day16.Tile.MirrorSlash, Day16.Dir.Left, new Day16.Dir[] { Day16.Dir.Down })]
        [InlineData(Day16.Tile.MirrorSlash, Day16.Dir.Right, new Day16.Dir[] { Day16.Dir.Up })]
        [InlineData(Day16.Tile.MirrorBackslash, Day16.Dir.Up, new Day16.Dir[] { Day16.Dir.Left })]
        [InlineData(Day16.Tile.MirrorBackslash, Day16.Dir.Down, new Day16.Dir[] { Day16.Dir.Right })]
        [InlineData(Day16.Tile.MirrorBackslash, Day16.Dir.Left, new Day16.Dir[] { Day16.Dir.Up })]
        [InlineData(Day16.Tile.MirrorBackslash, Day16.Dir.Right, new Day16.Dir[] { Day16.Dir.Down})]
        public void GetNextDir(Day16.Tile tile, Day16.Dir dir, Day16.Dir[] expected)
        {
            // arrange
            var sut = new Day16();

            // act
            var actual = sut.GetNextDir(tile, dir).ToArray();

            // assert
            Assert.Equal(expected, actual);
        }



        [Theory]
        [FileTestData("Day16/sample.in", 46)]
        [FileTestData("Day16/input.in", 7111)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day16();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day16/sample.in", 51)]
        [FileTestData("Day16/input.in", 7831)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day16();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
