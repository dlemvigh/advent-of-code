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
    public class Day17Tests
    {

        [Theory]
        [InlineData("12\n34", 6)]
        [InlineData("13\n24", 6)]
        [InlineData("01\n90", 1)]
        [InlineData("011\n990", 2)]
        [InlineData("012\n990", 3)]
        [InlineData("0111\n9990", 3)]
        [InlineData("0123\n9990", 6)]
        [InlineData("01111\n99990", 3 + 9)]
        [InlineData("01234\n99990", 6 + 9)]
        [InlineData("011111\n999990", 3 + 18)]
        [InlineData("012345\n999990", 6 + 18)]
        [InlineData("0111111\n9999990", 6 + 18)]
        [InlineData("0123456\n9999990", 6 + 27)]
        [InlineData("01111111\n99999990", 7 + 18)]
        [InlineData("01234567\n99999990", 28 + 18)]
        [InlineData("011111111\n999999990", 7 + 27)]
        [InlineData("012345678\n999999990", 28 + 18 + 9)]
        [InlineData("0111111111\n9999999990", 7 + 36)]
        [InlineData("01111111111\n99999999990", 10 + 36)]
        [InlineData("011111111111\n999999999990", 11 + 36)]
        [InlineData("01111\n99291\n99220", 8)]
        [FileTestData("Day17/sample.in", 102)]
        [FileTestData("Day17/input.in", 1013)] // 1016 too high
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day17();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day17/sample.in", 94)]
        [FileTestData("Day17/sample2.in", 71)]
        [FileTestData("Day17/input.in", 1215)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day17() { StepMinLimit = 4, StepMaxLimit = 10};

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
