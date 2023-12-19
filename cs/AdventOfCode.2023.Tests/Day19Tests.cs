using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;
using static AdventOfCode.Y2022.Day19;

namespace AdventOfCode2023.Tests
{
    public class Day19Tests
    {
        [Theory]
        [InlineData("{x=0,m=1,a=2,s=3}", 0, 1, 2, 3)]
        [InlineData("{x=787,m=2655,a=1222,s=2876}", 787, 2655, 1222, 2876)]
        public void ParsePart(string input, int x, int m, int a, int s)
        {
            // arrange 
            var expected = new Part(x, m, a, s);
            var sut = new Day19();

            // act
            var actual = sut.ParsePart(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("A", "A")]
        [InlineData("R", "R")]
        [InlineData("a>1716:A", "A")]
        [InlineData("a>1716:R", "R")]
        [InlineData("a>1716:abc", "abc")]
        public void ParseEdge_State(string input, string state)
        {
            // arrange 
            var sut = new Day19();

            // act
            var actual = sut.ParseEdge(input);

            // assert
            Assert.Equal(state, actual.state);
        }

        public static IEnumerable<object[]> ParseEdge_Cond_TestData
        {
            get
            {
                yield return new object[] { "x>0:A", new Part(0, 0, 0, 0), false };
                yield return new object[] { "x>0:A", new Part(1, 0, 0, 0), true };
                yield return new object[] { "m>0:A", new Part(0, 0, 0, 0), false };
                yield return new object[] { "m>0:A", new Part(0, 1, 0, 0), true };
                yield return new object[] { "a>0:A", new Part(0, 0, 0, 0), false };
                yield return new object[] { "a>0:A", new Part(0, 0, 1, 0), true };
                yield return new object[] { "s>0:A", new Part(0, 0, 0, 0), false };
                yield return new object[] { "s>0:A", new Part(0, 0, 0, 1), true };

                yield return new object[] { "x<1:A", new Part(0, 0, 0, 0), true };
                yield return new object[] { "x<1:A", new Part(1, 0, 0, 0), false };
                yield return new object[] { "m<1:A", new Part(0, 0, 0, 0), true };
                yield return new object[] { "m<1:A", new Part(0, 1, 0, 0), false };
                yield return new object[] { "a<1:A", new Part(0, 0, 0, 0), true };
                yield return new object[] { "a<1:A", new Part(0, 0, 1, 0), false };
                yield return new object[] { "s<1:A", new Part(0, 0, 0, 0), true };
                yield return new object[] { "s<1:A", new Part(0, 0, 0, 1), false };
            }
        }

        [Theory]
        [MemberData(nameof(ParseEdge_Cond_TestData))]
        public void ParseEdge_Cond(string input, Part part, bool expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var edge = sut.ParseEdge(input);
            Assert.NotNull(edge.cond);
            var actual = edge.cond(part);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day19/sample.in", 19114)]
        [FileTestData("Day19/input.in", 331208)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory(Skip = "NYI")]
        [FileTestData("Day19/sample.in", 4)]
        [FileTestData("Day19/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
