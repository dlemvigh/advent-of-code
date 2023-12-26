using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day_Tests
    {

        [Theory]
        [FileTestData("Day_/sample.in", 1)]
        [FileTestData("Day_/input.in", 23)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day_();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day_/sample.in", 4)]
        [FileTestData("Day_/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day_();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
