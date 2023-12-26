using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day11Tests
    {

        [Theory]
        // Part 1
        [FileTestData("Day11/sample.in", 1, 374)]
        [FileTestData("Day11/input.in", 1, 9693756)]
        // Part 2
        [FileTestData("Day11/sample.in", 9, 1030)]
        [FileTestData("Day11/sample.in", 99, 8410)]
        [FileTestData("Day11/input.in", 999999L, 717878258016L)]
        public void GetAllGalaxyDistances(string input, long multiplier, long expected)
        {
            // arrange 
            var sut = new Day11();

            // act
            var actual = sut.GetAllGalaxyDistances(input, multiplier);

            // assert
            Assert.Equal(expected, actual);
        }

    }
}
