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
        [InlineData("1", 11)]
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
        [InlineData("1abc2", 12)]
        [InlineData("pqr3stu8vwx", 38)]
        [InlineData("a1b2c3d4e5f", 15)]
        [InlineData("treb7uchet", 77)]
        public void Part1Line(string input, int expected)
        {
            var sut = new Day1();

            var value = sut.Part1Line(input);

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
        [InlineData("oneight", 18)]
        [InlineData("two1nine", 29)]
        [InlineData("eightwothree", 83)]
        [InlineData("abcone2threexyz", 13)]
        [InlineData("xtwone3four", 24)]
        [InlineData("4nineeightseven2", 42)]
        [InlineData("zoneight234", 14)]
        [InlineData("7pqrstsixteen", 76)]
        public void Part2Line(string input, int expected)
        {
            var sut = new Day1();

            var value = sut.Part2Line(input);

            Assert.Equal(expected, value);
        }

        [Theory]
        [FileTestData("Day1/sample.in", 142)]
        [FileTestData("Day1/sample2.in", 281)]
        //[FileTestData("Day1/input.in", 54718)] // TOO HIGH
        [FileTestData("Day1/input.in", 54706)]
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
