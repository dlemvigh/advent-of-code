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
    public class Day1Tests
    {

        [Theory]
        [InlineData("", "")]
        [InlineData("1", "1")]
        [InlineData("a", "")]
        [InlineData("0", "0")]
        [InlineData("a1b2c3", "123")]
        public void GetDigits(string input, string expected)
        {
            var sut = new Day1();

            var digits = sut.GetDigits(input);

            Assert.Equal(expected, digits);
        }

        [Theory]
        [InlineData("11", 11)]
        [InlineData("111", 11)]
        [InlineData("123", 13)]
        public void GetFirstAndLast(string input, int expected)
        {
            var sut = new Day1();

            var value = sut.GetFirstAndLast(input);

            Assert.Equal(expected, value);
        }

        [Theory]
        [FileTestData("Day1/sample.in", 142)]
        [FileTestData("Day1/input.in", 55447)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day1();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("1", 1)]
        [InlineData("1\n2", 2)]
        [InlineData("1\n2\n\n0", 0)]
        [InlineData("1\n2\n\n9", 9)]
        [FileTestData("DayX/sample.in", 4)]
        [FileTestData("DayX/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day1();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
