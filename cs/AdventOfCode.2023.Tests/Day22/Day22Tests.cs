using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2023.Day22;

namespace AdventOfCode2023.Tests.Day22
{
    public class Day22Tests
    {

        public static IEnumerable<object[]> GetDroppedBrick22TestData()
        {
            yield return new object[] { new Brick(0..0, 0..0, 0..0), 0, new Brick(0..0, 0..0, 0..0) };
            yield return new object[] { new Brick(0..0, 0..0, 0..0), 1, new Brick(0..0, 0..0, 1..1) };
            yield return new object[] { new Brick(0..0, 0..0, 3..5), 0, new Brick(0..0, 0..0, 0..2) };
            yield return new object[] { new Brick(0..0, 0..0, 3..5), 1, new Brick(0..0, 0..0, 1..3) };
        }

        [Theory]
        [MemberData(nameof(GetDroppedBrick22TestData))]
        public void GetDroppedBrick(Brick brick, int maxHeight, Brick expected)
        {
            // arrange 
            var sut = new AdventOfCode2023.Day22.Day22();

            // act
            var actual = sut.GetDroppedBrick(brick, maxHeight);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day22/sample.in", 5)]
        [FileTestData("Day22/input.in", 490)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new AdventOfCode2023.Day22.Day22();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory(Skip = "NYI")]
        [FileTestData("Day22/sample.in", 4)]
        [FileTestData("Day22/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new AdventOfCode2023.Day22.Day22();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
