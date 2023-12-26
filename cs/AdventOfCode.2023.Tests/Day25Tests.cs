using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;
using static AdventOfCode.Y2023.Day25;

namespace AdventOfCode2023.Tests
{
    public class Day25Tests
    {
        public static IEnumerable<object[]> ParseInput_TestData()
        {
            yield return new object[] { "a: b", new Graph { 
                { "a", new List<string> { "b" } },
                { "b", new List<string> { "a" } }
            } };
            yield return new object[] { "a: b b b", new Graph {
                { "a", new List<string> { "b", "b", "b" } },
                { "b", new List<string> { "a", "a", "a" } }
            } };
            yield return new object[] { "a: b\nc: d", new Graph { 
                { "a", new List<string> { "b" } },
                { "b", new List<string> { "a" } },
                { "c", new List<string> { "d" } },
                { "d", new List<string> { "c" } }
            } };
            yield return new object[] { "a: b c", new Graph { 
                { "a", new List<string> { "b", "c" } },
                { "b", new List<string> { "a" } },
                { "c", new List<string> { "a" } }
            } };
        }

        [Theory]
        [MemberData(nameof(ParseInput_TestData))]
        public void ParseInputTest(string input, Graph expected)
        {
            // act
            var actual = ParseInput(input);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> MergeNodes_TestData
        {
            get
            {
                yield return new object[] { ParseInput("a: b"), "a", "b", ParseInput("a,b: ") };
                yield return new object[] { ParseInput("a: b\nb: c"), "a", "b", ParseInput("a,b: c") };
                yield return new object[] { ParseInput("a: b\nb: c\nc: d"), "a", "b", ParseInput("a,b: c\nc: d") };
                yield return new object[] { ParseInput("a: b\nb: c\nc: d"), "b", "c", ParseInput("a: b,c\nb,c: d") };
                yield return new object[] { ParseInput("a: b\nb: c\nc: d"), "c", "d", ParseInput("a: b\nb: c,d") };
                yield return new object[] { ParseInput("a: b c\nb: c"), "b", "c", ParseInput("a: b,c b,c") };
                yield return new object[] { ParseInput("a: b\nb: c c"), "a", "b", ParseInput("a,b: c c") };
                yield return new object[] { ParseInput("a: b b\nb: c"), "a", "b", ParseInput("a,b: c") };
                yield return new object[] { ParseInput("a: b b\nb: c c"), "a", "b", ParseInput("a,b: c c") };
            }
        }

        [Theory]
        [MemberData(nameof(MergeNodes_TestData))]
        public void MergeNodes(Graph graph, string src, string dest, Graph expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            sut.MergeNodes(graph, src, dest);

            // assert
            foreach(var key in expected.Keys)
            {
                expected[key] = expected[key].Order().ToList();
            }
            foreach(var key in graph.Keys)
            {
                graph[key] = graph[key].Order().ToList();
            }
            Assert.Equal(expected, graph);
        }

        [Fact]
        public void MergeNodes_DogBone_CorrectOrder()
        {
            // arrange: a=b-c=d
            var input = "a: b b\nb: c\nc: d d";
            var graph = ParseInput(input);
            var sut = new Day25();

            // act
            sut.MergeNodes(graph, "a", "b");
            sut.MergeNodes(graph, "c", "d");

            // assert
            var expected = ParseInput("a,b: c,d");
            Assert.Equal(expected, graph);
        }

        [Fact]
        public void MergeNodes_DogBone_WrongOrder()
        {
            // arrange: a=b-c=d
            var input = "a: b b\nb: c\nc: d d";
            var graph = ParseInput(input);
            var sut = new Day25();

            // act
            sut.MergeNodes(graph, "b", "c");
            sut.MergeNodes(graph, "a", "b,c");

            // assert
            var expected = ParseInput("a,b,c: d d");
            Assert.Equal(expected, graph);
        }

        [Theory]
        [FileTestData("Day25/sample.in", 54)]
        [FileTestData("Day25/input.in", 591890)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory(Skip = "NYI")]
        [FileTestData("Day25/sample.in", 4)]
        [FileTestData("Day25/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
