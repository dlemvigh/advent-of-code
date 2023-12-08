using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019.Tests
{
    public class Day2Tests
    {
        [Theory]
        [FileTestData("Day2/sample1.in", 0, 3500)]
        [InlineData("1,0,0,0,99", 0, 2)]
        [InlineData("2,3,0,3,99", 3, 6)]
        [InlineData("2,4,4,5,99,0", 5, 9801)]
        [InlineData("1,1,1,4,99,5,6,0,99", 0, 30)]
        public void RunTillHalt(string input, int adr, int expected)
        {
            // arrange 
            var sut = new Computer(input);

            // act
            sut.RunTillHalt();

            // assert
            Assert.Equal(expected, sut.Memory.ReadPos(adr));
        }

        [Theory]
        [FileTestData("Day2/input.in", 3562672)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day2/input.in", 19690720, 8250)]
        public void Part2(string input, int target, int expected)
        {
            // arrange 
            var sut = new Day2();

            // act
            var actual = sut.Part2(input, target);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
