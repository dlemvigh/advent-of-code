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
    public class Day13Tests
    {
        [Theory]
        [InlineData(".", 0)]
        [InlineData("#", 1)]
        [InlineData("..", 0)]
        [InlineData(".#", 1)]
        [InlineData("#.", 2)]
        [InlineData("##", 3)]
        [InlineData("#..#", 9)]
        [InlineData(".##.", 6)]
        public void Hash(string input, int expected)
        {
            // arrange 
            var sut = new Day13();

            // act
            var actual = sut.Hash(input);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> HashImage_TestCases
        {
            get
            {
                yield return new object[] { new Day13.Image(new [] {"."}), new Day13.HashedImage(new [] { 0L }, new [] { 0L }) };
                yield return new object[] { new Day13.Image(new[] { "#" }), new Day13.HashedImage(new[] { 1L }, new[] { 1L }) };
                yield return new object[] { new Day13.Image(new[] { "##", ".." }), new Day13.HashedImage(new[] { 3L, 0L }, new[] { 2L, 2L }) };
            }
        }

        [Theory]
        [MemberData(nameof(HashImage_TestCases))]
        public void HashImage(Day13.Image input, Day13.HashedImage expected) {
            // arrange 
            var sut = new Day13();

            // act
            var actual = sut.HashImage(input);

            // assert
            Assert.Equal(expected.rows, actual.rows);
            Assert.Equal(expected.columns, actual.columns);
        }

        [Theory]
        [InlineData(1, null, 0, 0)]
        [InlineData(1, null, 1, 1)]
        [InlineData(-1, null, 1, 2)]
        [InlineData(1, null, 42, 42)]
        [InlineData(1, null, 0, 0, 1)]
        [InlineData(2, null, 0, 1, 1)]
        [InlineData(2, null, 0, 1, 1, 0)]
        [InlineData(2, null, 2, 1, 1, 2)]
        [InlineData(1, null, 0, 0, 0)]
        [InlineData(2, 1, 0, 0, 0)]
        public void GetReflection(int expected, int? ignore, params int[] values)
        {
            // arrange 
            var input = values.Select(x => (long) x);
            var sut = new Day13();

            // act
            var actual = sut.GetReflection(input, ignore);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day13/sample.in", 405)]
        [FileTestData("Day13/input.in", 28895)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day13();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day13/sample.in", 400)]
        [FileTestData("Day13/input.in", 31603)] // 22044 too low // 28832 too low
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day13();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}

