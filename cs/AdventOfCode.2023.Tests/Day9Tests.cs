using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;
using Microsoft.VisualStudio.TestPlatform.Utilities;

namespace AdventOfCode2023.Tests
{
    public class Day9Tests
    {

        [Theory]
        [InlineData(new[] { 0, 0 }, new[] { 0 })]
        [InlineData(new[] { 0, 1 }, new[] { 1 })]
        [InlineData(new[] { 0, 2 }, new[] { 2 })]
        [InlineData(new[] { 0, -1 }, new[] { -1 })]
        [InlineData(new[] { 0, 0, 0 }, new[] { 0, 0 })]
        [InlineData(new[] { 1, 1, 1 }, new[] { 0, 0 })]
        [InlineData(new[] { -1, -1, -1 }, new[] { 0, 0 })]
        [InlineData(new[] { 0, 1, 2 }, new[] { 1, 1 })]
        [InlineData(new[] { 0, 1, 3 }, new[] { 1, 2 })]
        [InlineData(new[] { 2, 1, 0 }, new[] { -1, -1 })]
        public void GetDiffs(int[] input, int[] output)
        {
            // arrange 
            var sut = new Day9();

            // act
            var actual = sut.GetDiffs(input);

            // assert
            Assert.Equal(output, actual);
        }

        [Theory]
        [InlineData(new[] { 0, 0 }, 0)]
        [InlineData(new[] { 0, 1 }, 2)]
        [InlineData(new[] { 0, 2 }, 4)]
        [InlineData(new[] { 2, 1 }, 0)]
        [InlineData(new[] { 0, 1, 2 }, 3)]
        [InlineData(new[] { 0, 2, 4 }, 6)]
        [InlineData(new[] { 0, 1, 3 }, 6)]
        [InlineData(new[] { 0, 3, 6, 9, 12, 15 }, 18)]
        [InlineData(new[] { 1, 3, 6, 10, 15, 21 }, 28)]
        [InlineData(new[] { 10, 13, 16, 21, 30, 45 }, 68)]
        public void GetNextInSequence(int[] input, int expected) {
            // arrange 
            var sut = new Day9();

            // act
            var actual = sut.GetNextInSequence(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(new[] { 0, 0 }, 0)]
        [InlineData(new[] { 0, 1 }, -1)]
        [InlineData(new[] { 0, 2 }, -2)]
        [InlineData(new[] { 2, 1 }, 3)]
        [InlineData(new[] { 0, 1, 2 }, -1)]
        [InlineData(new[] { 0, 2, 4 }, -2)]
        [InlineData(new[] { 0, 2, 3 }, -3)]
        [InlineData(new[] { 0, 3, 6, 9, 12, 15 }, -3)]
        [InlineData(new[] { 1, 3, 6, 10, 15, 21 }, 0)]
        [InlineData(new[] { 10, 13, 16, 21, 30, 45 }, 5)]
        public void GetPrevInSequence(int[] input, int expected)
        {
            // arrange 
            var sut = new Day9();

            // act
            var actual = sut.GetPrevInSequence(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day9/sample.in", 114)]
        [FileTestData("Day9/input.in", 1901217887)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day9();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day9/sample.in", 2)]
        [FileTestData("Day9/input.in", 905)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day9();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
