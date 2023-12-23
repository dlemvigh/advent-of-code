using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;
using AdventOfCode2023.Day22;

namespace AdventOfCode2023.Tests.Day22
{
    public class InputParserTests
    {
        public static IEnumerable<object[]> InputParser_ParseBrick_TestData
        {
            get
            {
                yield return new object[] { "0,0,0~0,0,0", new Brick(0..0, 0..0, 0..0) };
                yield return new object[] { "0,0,0~1,1,1", new Brick(0..1, 0..1, 0..1) };
                yield return new object[] { "1,1,1~2,2,2", new Brick(1..2, 1..2, 1..2) };
                yield return new object[] { "0,0,0~1,0,0", new Brick(0..1, 0..0, 0..0) };
                yield return new object[] { "0,0,0~0,1,0", new Brick(0..0, 0..1, 0..0) };
                yield return new object[] { "0,0,0~0,0,1", new Brick(0..0, 0..0, 0..1) };
            }
        }

        [Theory]
        [MemberData(nameof(InputParser_ParseBrick_TestData))]
        public void InputParser_ParseBrick(string input, Brick expected)
        {
            // arrange 
            var sut = new InputParser();

            // act
            var actual = sut.ParseBrick(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
