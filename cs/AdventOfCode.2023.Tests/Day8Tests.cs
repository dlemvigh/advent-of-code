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
    public class Day8Tests
    {

        [Theory]
        [FileTestData("Day8/sample1.in", 2)]
        [FileTestData("Day8/sample2.in", 6)]
        [FileTestData("Day8/input.in", 18157)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day8();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day8/sample3.in", 6L)]
        [FileTestData("Day8/input.in", 14299763833181L)]
        public void Part2(string input, long expected)
        {
            // arrange 
            var sut = new Day8();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
