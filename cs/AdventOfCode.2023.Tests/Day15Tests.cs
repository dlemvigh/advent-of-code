using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;
using AdventOfCode2023.Day5;

namespace AdventOfCode2023.Tests
{
    public class Day15Tests
    {
        [Theory]
        [InlineData("", 0)]
        [InlineData("HASH", 52)]
        [InlineData("rn=1", 30)]
        [InlineData("cm-", 253)]
        [InlineData("qp=3", 97)]
        [InlineData("cm=2", 47)]
        [InlineData("qp-", 14)]
        [InlineData("pc=4", 180)]
        [InlineData("ot=9", 9)]
        [InlineData("ab=5", 197)]
        [InlineData("pc-", 48)]
        [InlineData("pc=6", 214)]
        [InlineData("ot=7", 231)]
        [InlineData("rn", 0)]
        [InlineData("cm", 0)]
        [InlineData("qp", 1)]
        public void HashString(string input, int expected)
        {
            // arrange
            var sut = new Day15();

            var actual = sut.HashString(input);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> ParseInstruction_TestData {
            get
            {
                yield return new object[] { "label=5", new Day15.Instruction("label", Day15.Op.Assign, 5) };
                yield return new object[] { "label-", new Day15.Instruction("label", Day15.Op.Remove, null) };
              // Add more test data here
          }
        }

        [Theory]
        [MemberData(nameof(ParseInstruction_TestData))]
        public void ParseInstruction(string input, Day15.Instruction expected)
        {
            // arrange 
            var sut = new Day15();

            // act
            var actual = sut.ParseInstruction(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day15/sample.in", 1320)]
        [FileTestData("Day15/input.in", 515495)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day15();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day15/sample.in", 145)]
        [FileTestData("Day15/input.in", 229349)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day15();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
