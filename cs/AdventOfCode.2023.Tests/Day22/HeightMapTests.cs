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
    public class HeightMapTests
    {
        private readonly IHeightMap sut;

        public HeightMapTests() {
            sut = new HeightMap();
            sut[0, 0] = 1;
            sut[1, 0] = 2;
            sut[2, 0] = 3;
            sut[0, 1] = 4;
            sut[1, 1] = 5;
            sut[2, 1] = 6;
            sut[0, 2] = 7;
            sut[1, 2] = 8;
            sut[2, 2] = 9;
        }


        public static IEnumerable<object[]> GetMaxHeight_TestData_1x1
        {
            get
            {
                yield return new object[] { new Brick(0..0, 0..0, 0..0), 1 };
                yield return new object[] { new Brick(1..1, 0..0, 0..0), 2 };
                yield return new object[] { new Brick(2..2, 0..0, 0..0), 3 };
                yield return new object[] { new Brick(0..0, 1..1, 0..0), 4 };
                yield return new object[] { new Brick(1..1, 1..1, 0..0), 5 };
                yield return new object[] { new Brick(2..2, 1..1, 0..0), 6 };
                yield return new object[] { new Brick(0..0, 2..2, 0..0), 7 };
                yield return new object[] { new Brick(1..1, 2..2, 0..0), 8 };
                yield return new object[] { new Brick(2..2, 2..2, 0..0), 9 };
            }
        }
        public static IEnumerable<object[]> GetMaxHeight_TestData_2x1
        {
            get
            {
                yield return new object[] { new Brick(0..1, 0..0, 0..0), 2 };
                yield return new object[] { new Brick(1..2, 0..0, 0..0), 3 };
                yield return new object[] { new Brick(0..1, 1..1, 0..0), 5 };
                yield return new object[] { new Brick(1..2, 1..1, 0..0), 6 };
                yield return new object[] { new Brick(0..1, 2..2, 0..0), 8 };
                yield return new object[] { new Brick(1..2, 2..2, 0..0), 9 };
            }
        }
        public static IEnumerable<object[]> GetMaxHeight_TestData_1x2
        {
            get
            {
                yield return new object[] { new Brick(0..0, 0..1, 0..0), 4 };
                yield return new object[] { new Brick(0..0, 1..2, 0..0), 7 };
                yield return new object[] { new Brick(1..1, 0..1, 0..0), 5 };
                yield return new object[] { new Brick(1..1, 1..2, 0..0), 8 };
                yield return new object[] { new Brick(2..2, 0..1, 0..0), 6 };
                yield return new object[] { new Brick(2..2, 1..2, 0..0), 9 };
            }
        }
        public static IEnumerable<object[]> GetMaxHeight_TestData_2x2
        {
            get
            {
                yield return new object[] { new Brick(0..1, 0..1, 0..0), 5 };
                yield return new object[] { new Brick(1..2, 0..1, 0..0), 6 };
                yield return new object[] { new Brick(0..1, 1..2, 0..0), 8 };
                yield return new object[] { new Brick(1..2, 1..2, 0..0), 9 };
            }
        }

        [Theory]
        [MemberData(nameof(GetMaxHeight_TestData_1x1))]
        [MemberData(nameof(GetMaxHeight_TestData_2x1))]
        [MemberData(nameof(GetMaxHeight_TestData_1x2))]
        [MemberData(nameof(GetMaxHeight_TestData_2x2))]
        public void GetMaxHeight(Brick brick, int expected)
        {
            // act
            var actual = sut.GetMaxHeight(brick);

            // assert
            Assert.Equal(expected, actual);
        }

    }
}
