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
    public class Day7Tests
    {

        [Theory]
        [FileTestData("Day7/sample.in", 6440)]
        [FileTestData("Day7/input.in", 6440)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        //[Theory]
        //[FileTestData("Day7/sample.in", 4)]
        //[FileTestData("Day7/input.in", 41)]
        //public void Part2(string input, int expected)
        //{
        //    // arrange 
        //    var sut = new Day7();

        //    // act
        //    var actual = sut.Part2(input);

        //    // assert
        //    Assert.Equal(expected, actual);
        //}
    }
}
