using AdventOfCode.Y2020;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode.Tests.Y2020
{
    public class Day17Tests
    {
        private readonly Day17 sut = new Day17();

        [Theory]
        [FileTestData("Y2020/Day17/sample.in",112)]
        [FileTestData("Y2020/Day17/input.in", 230)]
        public void Part1(string input, int expected)
        {
            Assert.Equal(expected, sut.Part1(input));
        }

        [Theory]
        [FileTestData("Y2020/Day17/sample.in")]
        [FileTestData("Y2020/Day17/input.in")]
        public void Part1_ToString(string input)
        {
            var cube = sut.ParseInput(input);
            Assert.Equal(input, cube.ToString());
        }

        [Theory]
        [FileTestData("Y2020/Day17/sample.in", 0, 0, 0, false)]
        [FileTestData("Y2020/Day17/sample.in", 0, 0, 1, true)]
        [FileTestData("Y2020/Day17/sample.in", 0, 0, 2, false)]
        [FileTestData("Y2020/Day17/sample.in", 0, 1, 0, false)]
        [FileTestData("Y2020/Day17/sample.in", 0, 1, 1, false)]
        [FileTestData("Y2020/Day17/sample.in", 0, 1, 2, true)]
        [FileTestData("Y2020/Day17/sample.in", 0, 2, 0, true)]
        [FileTestData("Y2020/Day17/sample.in", 0, 2, 1, true)]
        [FileTestData("Y2020/Day17/sample.in", 0, 2, 2, true)]
        public void Part1_Index(string input, int z, int y, int x, bool expected)
        {
            var cube = sut.ParseInput(input);
            var actual = cube[z, y, x];
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Part1_GetIndex()
        {
            var cube = new Day17.Cube(2, 3, 7);
            var index = cube.GetIndex(1, 2, 6);
            Assert.Equal(1 * 3 * 7 + 2 * 7 + 6, index);
        }

        [Theory]
        [FileTestData("Y2020/Day17/sample.in")]
        public void Part1_GetNextGeneration(string input)
        {
            var cube = sut.ParseInput(input);
            var next = sut.GetNextGeneration(cube);
            var expected = new[]
            {
                new [] {
                    ".....",
                    ".....",
                    ".#...",
                    "...#.",
                    "..#.."
                },
                new [] {
                    ".....",
                    ".....",
                    ".#.#.",
                    "..##.",
                    "..#.."
                },
                new [] {
                    ".....",
                    ".....",
                    ".#...",
                    "...#.",
                    "..#.."
                }
            };
            var expectedStr = string.Join("\n\n", expected.Select(layer => string.Join("\n", layer)));
            var actual = next.ToString();
            
            Assert.Equal(expectedStr, actual);
        }


    }
}
