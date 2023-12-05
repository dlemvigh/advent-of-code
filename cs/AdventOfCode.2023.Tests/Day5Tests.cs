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
    public class Day5Tests
    {
        [Theory]
        [InlineData("50 98 2", 98, 99, 50, 51, -48)]
        [InlineData("52 50 48", 50, 97, 52, 99, 2)]
        public void ParseMap(string input, int fromStart, int fromEnd, int toStart, int toEnd, int diff)
        {
            // arrange 
            var sut = new Day5();

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
            var sut = new Day5();

            // act
            var mapper = sut.ParseMap(input);
            var actual = sut.Map(value, mapper);

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
            var sut = new Day5();

            // act
            var mappers = inputs.Select(sut.ParseMap).ToArray();
            var actual = sut.Map(value, mappers);

            // assert
            Assert.Equal(expected, actual);
        }


        [Theory]
        [FileTestData("Day5/sample.in", 35)]
        [FileTestData("Day5/input.in", 621354867)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day5();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        //[Theory]
        //[FileTestData("Day5/sample.in", 4)]
        //[FileTestData("Day5/input.in", 41)]
        //public void Part2(string input, int expected)
        //{
        //    // arrange 
        //    var sut = new Day5();

        //    // act
        //    var actual = sut.Part2(input);

        //    // assert
        //    Assert.Equal(expected, actual);
        //}
    }
}
