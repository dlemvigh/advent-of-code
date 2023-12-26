using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2023;
using AdventOfCode2023.Day22;

namespace AdventOfCode2023.Tests.Day22
{
    public class ZCacheTests
    {
        public static IEnumerable<object[]> BricksOverlapXY_TestData
        {
            get
            {
                yield return new object[] { new Brick(0..0, 0..0, 0..0), new Brick(0..0, 0..0, 0..0), true };
                yield return new object[] { new Brick(0..0, 0..0, 0..0), new Brick(1..1, 0..0, 0..0), false };
                yield return new object[] { new Brick(0..0, 0..0, 0..0), new Brick(0..0, 1..1, 0..0), false };
                yield return new object[] { new Brick(0..0, 0..0, 0..0), new Brick(0..0, 0..0, 1..1), true };

                yield return new object[] { new Brick(1..1, 0..0, 0..0), new Brick(0..2, 0..0, 0..0), true };
                yield return new object[] { new Brick(0..0, 1..1, 0..0), new Brick(0..0, 0..2, 0..0), true };
                yield return new object[] { new Brick(0..2, 0..0, 0..0), new Brick(1..1, 0..0, 0..0), true };
                yield return new object[] { new Brick(0..0, 0..2, 0..0), new Brick(0..0, 1..1, 0..0), true };
            }
        }


        [Theory]
        [MemberData(nameof(BricksOverlapXY_TestData))]
        public void BricksOverlapXY(Brick a, Brick b, bool expected)
        {
            // arrange 
            var sut = new ZCache();
            
            // act
            var actual = sut.BricksOverlapXY(a, b);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
