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
            var expected = new Part { ["x"] = x, ["m"] = m, ["a"] = a, ["s"] = s };
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
            var actual = Day19.ParseEdge(input);

            // assert
            Assert.Equal(state, actual.state);
        }

        public static IEnumerable<object[]> SumPartRange_TestData
        {
            get
            {
                yield return new object[] { new PartRange { ["x"] = new Day19.Range(1, 1) }, 1L };
                yield return new object[] { new PartRange { ["x"] = new Day19.Range(1, 2) }, 2L };
                yield return new object[] { new PartRange { ["x"] = new Day19.Range(1, 4000) }, 4000L };
                yield return new object[] { new PartRange { ["x"] = new Day19.Range(1, 1), ["m"] = new Day19.Range(1, 1) }, 1L };
                yield return new object[] { new PartRange { ["x"] = new Day19.Range(1, 2), ["m"] = new Day19.Range(1, 2) }, 4L };
                yield return new object[] { new PartRange { 
                    ["x"] = new Day19.Range(1, 2), 
                    ["m"] = new Day19.Range(1, 2),
                    ["a"] = new Day19.Range(1, 2),
                    ["s"] = new Day19.Range(1, 2)
                }, 16L };
            }
        }


        [Theory]
        [MemberData(nameof(SumPartRange_TestData))]
        public void SumPartRange(PartRange part, long expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var actual = sut.SumPartRange(part);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> GetNextRanges_TestData
        {
            get
            {
                //yield return new object[]
                //{
                //    new PartRange { ["x"] = new Day19.Range(1, 4000) },
                //    ParseState("in{x>2000:A,R}"),
                //    ("A", new PartRange { ["x"] = new Day19.Range(2001, 4000) }),
                //    ("R", new PartRange { ["x"] = new Day19.Range(1, 2000) })
                //};
                //yield return new object[]
                //{
                //    new PartRange { ["x"] = new Day19.Range(1, 4000) },
                //    ParseState("in{x>3000:a,x>2000:b,x>1000:c,d}"),
                //    ("a", new PartRange { ["x"] = new Day19.Range(3001, 4000) }),
                //    ("b", new PartRange { ["x"] = new Day19.Range(2001, 3000) }),
                //    ("c", new PartRange { ["x"] = new Day19.Range(1001, 2000) }),
                //    ("d", new PartRange { ["x"] = new Day19.Range(0001, 1000) }),
                //};
                //yield return new object[]
                //{
                //    new PartRange { 
                //        ["x"] = new Day19.Range(1, 4000),
                //        ["m"] = new Day19.Range(1, 4000),
                //        ["a"] = new Day19.Range(1, 4000),
                //        ["s"] = new Day19.Range(1, 4000)
                //    },
                //    ParseState("in{x>2000:a,m>2000:b,a>2000:c,s>2000:d,e}"),
                //    ("a",
                //        new PartRange {
                //        ["x"] = new Day19.Range(2001, 4000),
                //        ["m"] = new Day19.Range(0001, 4000),
                //        ["a"] = new Day19.Range(0001, 4000),
                //        ["s"] = new Day19.Range(0001, 4000)
                //    }),
                //    ("b",
                //        new PartRange {
                //        ["x"] = new Day19.Range(0001, 2000),
                //        ["m"] = new Day19.Range(2001, 4000),
                //        ["a"] = new Day19.Range(0001, 4000),
                //        ["s"] = new Day19.Range(0001, 4000)
                //    }),
                //    ("c",
                //        new PartRange {
                //        ["x"] = new Day19.Range(0001, 2000),
                //        ["m"] = new Day19.Range(0001, 2000),
                //        ["a"] = new Day19.Range(2001, 4000),
                //        ["s"] = new Day19.Range(0001, 4000)
                //    }),
                //    ("d",
                //        new PartRange {
                //        ["x"] = new Day19.Range(0001, 2000),
                //        ["m"] = new Day19.Range(0001, 2000),
                //        ["a"] = new Day19.Range(0001, 2000),
                //        ["s"] = new Day19.Range(2001, 4000)
                //    }),
                //    ("e",
                //        new PartRange {
                //        ["x"] = new Day19.Range(0001, 2000),
                //        ["m"] = new Day19.Range(0001, 2000),
                //        ["a"] = new Day19.Range(0001, 2000),
                //        ["s"] = new Day19.Range(0001, 2000)
                //    })
                //};
                yield return new object[]
                {
                    new PartRange { ["x"] = new Day19.Range(100, 200) },
                    ParseState("in{x>2000:A,R}"),
                    ("R", new PartRange { ["x"] = new Day19.Range(100, 200) }),
                };
            }
        }

        [Theory]
        [MemberData(nameof(GetNextRanges_TestData))]
        public void GetNextRanges(PartRange input, State state, params (string state, PartRange range)[] expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var actual = sut.GetNextRanges(input, state);

            // assert
            Assert.Equal(expected, actual);
        }
        
        public static IEnumerable<object[]> ParseEdge_Cond_TestData
        {
            get
            {
                yield return new object[] { "x>0:A", new Part { ["x"] = 0 }, false };
                yield return new object[] { "x>0:A", new Part { ["x"] = 1 }, true };

                yield return new object[] { "m>0:A", new Part { ["m"] = 0 }, false };
                yield return new object[] { "m>0:A", new Part { ["m"] = 1 }, true };
                yield return new object[] { "a>0:A", new Part { ["a"] = 0 }, false };
                yield return new object[] { "a>0:A", new Part { ["a"] = 1 }, true };
                yield return new object[] { "s>0:A", new Part { ["s"] = 0 }, false };
                yield return new object[] { "s>0:A", new Part { ["s"] = 1 }, true };

                yield return new object[] { "x<1:A", new Part { ["x"] = 0 }, true };
                yield return new object[] { "x<1:A", new Part { ["x"] = 1 }, false };
                yield return new object[] { "m<1:A", new Part { ["m"] = 0 }, true };
                yield return new object[] { "m<1:A", new Part { ["m"] = 1 }, false };
                yield return new object[] { "a<1:A", new Part { ["a"] = 0 }, true };
                yield return new object[] { "a<1:A", new Part { ["a"] = 1 }, false };
                yield return new object[] { "s<1:A", new Part { ["s"] = 0 }, true };
                yield return new object[] { "s<1:A", new Part { ["s"] = 1 }, false };
            }
        }

        [Theory]
        [MemberData(nameof(ParseEdge_Cond_TestData))]
        public void ParseEdge_Cond(string input, Part part, bool expected)
        {
            // arrange 
            var sut = new Day19();

            // act
            var edge = Day19.ParseEdge(input);
            Assert.NotNull(edge.cond);
            var actual = edge.cond.test(part);

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

        [Theory]
        [FileTestData("Day19/sample.in", 167409079868000L)]
        //[FileTestData("Day19/input.in", 0L)]
        public void Part2(string input, long expected)
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
