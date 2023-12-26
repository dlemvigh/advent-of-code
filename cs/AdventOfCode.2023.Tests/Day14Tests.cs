using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day14Tests
    {

        [Theory]
        [InlineData("", true, "")]
        [InlineData(".", true, ".")]
        [InlineData("O", true, "O")]
        [InlineData("#", true, "#")]
        [InlineData(".O", true, "O.")]
        [InlineData("..O..O..", true, "OO......")]
        [InlineData("...O..O.", true, "OO......")]
        [InlineData("O..O....", true, "OO......")]
        [InlineData("O.O.....", true, "OO......")]
        [InlineData("..O..O..", false, "......OO")]
        [InlineData("...O..O.", false, "......OO")]
        [InlineData("O..O....", false, "......OO")]
        [InlineData("O.O.....", false, "......OO")]
        [InlineData("O..#..O", true, "O..#O..")]
        [InlineData(".O.#..O", true, "O..#O..")]
        [InlineData("..O#..O", true, "O..#O..")]
        [InlineData("OO.#..O", true, "OO.#O..")]
        [InlineData("O.O#..O", true, "OO.#O..")]
        [InlineData(".OO#..O", true, "OO.#O..")]
        [InlineData("O..#..O", false, "..O#..O")]
        [InlineData(".O.#..O", false, "..O#..O")]
        [InlineData("..O#..O", false, "..O#..O")]
        [InlineData("OO.#..O", false, ".OO#..O")]
        [InlineData("O.O#..O", false, ".OO#..O")]
        [InlineData(".OO#..O", false, ".OO#..O")]
        public void MoveRocks(string input, bool left, string expected)
        {
            // arrange
            var sut = new Day14();

            // act
            var actual = sut.MoveRocks(input, left);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("#", "#")]
        [InlineData("O", "O")]
        [InlineData(".", ".")]
        [InlineData("O.\n..", "..\n.O")]
        [InlineData(".O\n..", "..\n.O")]
        [InlineData("..\nO.", "..\n.O")]
        [InlineData("..\n.O", "..\n.O")]
        [InlineData("...\n.#O\n..#", "...\n.#.\n.O#")]
        public void MoveRocksCycle(string input, string expected)
        {
            // arrange
            var sut = new Day14();

            // act
            var result = sut.MoveRocksCycle(input.Split("\n"));
            var actual = string.Join("\n", result);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day14/sample.in", 136)]
        [FileTestData("Day14/input.in", 110407)]
        public void Part1(string input, long expected)
        {
            // arrange 
            var sut = new Day14();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day14/sample.in", 64)]
        [FileTestData("Day14/input.in", 87273)] // 87286 too high
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day14();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
