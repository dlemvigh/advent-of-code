using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;

namespace AdventOfCode2023.Tests
{
    public class Day5Tests
    {
        [Theory]
        [InlineData("50 98 2", 98, 99, 50, 51, -48)]
        [InlineData("52 50 48", 50, 97, 52, 99, 2)]
        public void ParseMap(string input, int fromStart, int fromEnd, int toStart, int toEnd, int diff)
        {
            // arrange 
            var sut = new Day5.InputParser();

            // act
            var actual = sut.ParseMap(input);

            // assert
            Assert.Equal(fromStart, actual.From.Start);
            Assert.Equal(fromEnd, actual.From.End);
            Assert.Equal(toStart, actual.To.Start);
            Assert.Equal(toEnd, actual.To.End);
            Assert.Equal(diff, actual.Diff);
        }

        [Theory]
        [InlineData("50 98 2", 0, 0)]
        [InlineData("50 98 2", 97, 97)]
        [InlineData("50 98 2", 98, 50)]
        [InlineData("50 98 2", 99, 51)]
        [InlineData("50 98 2", 100, 100)]
        public void Map(string input, int value, int expected)
        {
            // arrange 
            var parser = new Day5.InputParser();
            var sut = new Day5.ValueMapper();

            // act
            var mapper = parser.ParseMap(input);
            var actual = sut.MapValue(value, mapper);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(new[] { "10 1 1" }, 0, 0)]
        [InlineData(new[] { "10 1 1" }, 1, 10)]
        [InlineData(new[] { "10 1 1", "20 2 1" }, 0, 0)]
        [InlineData(new[] { "10 1 1", "20 2 1" }, 1, 10)]
        [InlineData(new[] { "10 1 1", "20 2 1" }, 2, 20)]
        [InlineData(new[] { "50 98 2", "52 50 48" }, 79, 81)]
        [InlineData(new[] { "50 98 2", "52 50 48" }, 14, 14)]
        [InlineData(new[] { "50 98 2", "52 50 48" }, 55, 57)]
        [InlineData(new[] { "50 98 2", "52 50 48" }, 13, 13)]
        public void Mappers(string[] inputs, int value, int expected)
        {
            // arrange 
            var parser = new Day5.InputParser();
            var sut = new Day5.ValueMapper();

            // act
            var mappers = inputs.Select(parser.ParseMap).ToArray();
            var actual = sut.MapValue(value, mappers);

            // assert
            Assert.Equal(expected, actual);
        }


        [Theory]
        [FileTestData("Day5/sample.in", 35)]
        [FileTestData("Day5/input.in", 621354867)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day5.Day5();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("0 1 2", 0, false)]
        [InlineData("0 1 3", 1, true)]
        [InlineData("0 1 3", 2, true)]
        [InlineData("0 1 3", 3, true)]
        [InlineData("0 1 3", 4, false)]
        public void ValueIsInRange(string input, int value, bool expected)
        {
            // arrange 
            var parser = new Day5.InputParser();
            var sut = new Day5.ValueMapper();
            var mapper = parser.ParseMap(input);

            // act
            var actual = sut.IsInRange(value, mapper);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("0 1 3", 0, 0, false)]
        [InlineData("0 1 3", 2, 2, true)]
        [InlineData("0 1 3", 4, 4, false)]
        [InlineData("0 1 3", 0, 1, true)]
        [InlineData("0 1 3", 3, 4, true)]
        [InlineData("0 1 3", 0, 4, true)]
        public void RangeIsInRange(string input, int from, int to, bool expected)
        {
            // arrange 
            var range = new Day5.LongRange(from, to);
            var parser = new Day5.InputParser();
            var sut = new Day5.RangeMapper();
            var mapper = parser.ParseMap(input);

            // act
            var actual = sut.IsInRange(range, mapper);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day5/sample.in", 46)]
        [FileTestData("Day5/input.in", 15880236)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day5.Day5();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
