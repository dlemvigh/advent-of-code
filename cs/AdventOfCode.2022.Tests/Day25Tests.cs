using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Y2022;

namespace AdventOfCode.Tests.Y2022
{
    public class Day25Tests
    {
        [Theory]
        [InlineData(0, "0")]
        [InlineData(1, "1")]
        [InlineData(2, "2")]
        [InlineData(3, "1=")]
        [InlineData(4, "1-")]
        [InlineData(5, "10")]
        [InlineData(6, "11")]
        [InlineData(7, "12")]
        [InlineData(8, "2=")]
        [InlineData(9, "2-")]
        [InlineData(10, "20")]
        [InlineData(15, "1=0")]
        [InlineData(20, "1-0")]
        [InlineData(25, "100")]
        [InlineData(2022, "1=11-2")]
        [InlineData(12345, "1-0---0")]
        [InlineData(314159265, "1121-1110-1=0")]
        public void Decimal2snafu(long input, string expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            var actual = sut.Decimal2snafu(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("0", 0)]
        [InlineData("1", 1)]
        [InlineData("2", 2)]
        [InlineData("1=", 3)]
        [InlineData("1-", 4)]
        [InlineData("10", 5)]
        [InlineData("11", 6)]
        [InlineData("12", 7)]
        [InlineData("2=", 8)]
        [InlineData("2-", 9)]
        [InlineData("20", 10)]
        [InlineData("1=0", 15)]
        [InlineData("1-0", 20)]
        [InlineData("100", 25)]
        [InlineData("1=11-2", 2022)]
        [InlineData("1-0---0", 12345)]
        [InlineData("1121-1110-1=0", 314159265)]
        public void Snafu2decimal(string input, long expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            var actual = sut.Snafu2decimal(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day25/sample.in", "2=-1=0")]
        [FileTestData("Day25/input.in", "2-212-2---=00-1--102")]
        public void Part1(string input, string expected)
        {
            // arrange 
            var sut = new Day25();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day25/sample.in", 45000)]
        [FileTestData("Day25/input.in", 204610)]
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
