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
    public class Day11Tests
    {

        [Theory]
        [FileTestData("Day11/sample.in", 374)]
        [FileTestData("Day11/input.in", 9693756)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day11();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        //[Theory]
        //[FileTestData("Day11/sample.in", 4)]
        //[FileTestData("Day11/input.in", 41)]
        //public void Part2(string input, int expected)
        //{
        //    // arrange 
        //    var sut = new Day11();

        //    // act
        //    var actual = sut.Part2(input);

        //    // assert
        //    Assert.Equal(expected, actual);
        //}
    }
}
