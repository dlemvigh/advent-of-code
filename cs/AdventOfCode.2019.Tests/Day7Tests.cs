using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019.Tests
{
    public class Day7Tests
    {
        [Theory]
        [InlineData(
            "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
            new[] { 4, 3, 2, 1, 0 },
            43210
        )]
        [InlineData(
            "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
            new[] { 0, 1, 2, 3, 4 },
            54321
        )]
        [InlineData(
            "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
            new[] { 1, 0, 4, 3, 2 },
            65210
        )]
        public void RunAmpSetting(string program, int[] settings, int expected)
        {
            // arrange
            var day7 = new Day7();

            // act
            var actual = day7.RunAmpSetting(program, settings, 0);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(
            "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
            new[] { 0, 1, 2, 3, 4 },
            43210,
            new[] { 4, 3, 2, 1, 0 }
        )]
        [InlineData(
            "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
            new[] { 0, 1, 2, 3, 4 },
            54321,
            new[] { 0, 1, 2, 3, 4 }
        )]
        [InlineData(
            "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
            new[] { 0, 1, 2, 3, 4 },
            65210,
            new[] { 1, 0, 4, 3, 2 }
        )]
        [FileTestData("Day7/input.in", new[] { 0, 1, 2, 3, 4 }, 79723, new[] { 2, 3, 1, 0, 4 })]
        public void FindMaxAmpSetting(
            string program,
            int[] settings,
            int expectedMax,
            int[] expectedSettings
        )
        {
            // arrange
            var day7 = new Day7();

            // act
            var actual = day7.FindMaxAmpSetting(program, settings, 0);

            // assert
            Assert.Equal(expectedMax, actual.max);
            Assert.Equal(expectedSettings, actual.settings);
        }

        [Theory]
        [FileTestData("Day7/sample1.in", new[] { 9, 8, 7, 6, 5 }, 139629729)]
        [FileTestData("Day7/sample2.in", new[] { 9, 7, 8, 5, 6 }, 18216)]
        public void RunAmpSettingLoop(string program, int[] settings, int expected)
        {
            // arrange
            var day7 = new Day7();

            // act
            var actual = day7.RunAmpSettingLoop(program, settings, 0);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData(
            "Day7/sample1.in",
            new[] { 5, 6, 7, 8, 9 },
            139629729,
            new[] { 9, 8, 7, 6, 5 }
        )]
        [FileTestData("Day7/sample2.in", new[] { 5, 6, 7, 8, 9 }, 18216, new[] { 9, 7, 8, 5, 6 })]
        [FileTestData("Day7/input.in", new[] { 5, 6, 7, 8, 9 }, 70602018, new[] { 6, 9, 7, 8, 5 })]
        public void FindMaxAmpSettingLoop(
            string program,
            int[] settings,
            int expectedMax,
            int[] expectedSettings
        )
        {
            // arrange
            var day7 = new Day7();

            // act
            var actual = day7.FindMaxAmpSettingLoop(program, settings, 0);

            // assert
            Assert.Equal(expectedMax, actual.max);
            Assert.Equal(expectedSettings, actual.settings);
        }

        [Theory]
        [InlineData(new int[] { 1 }, 1)]
        [InlineData(new int[] { 1, 2 }, 2)]
        [InlineData(new int[] { 1, 2, 3 }, 6)]
        [InlineData(new int[] { 1, 2, 3, 4 }, 24)]
        public void GetPermutations_ReturnsCorrectNumberOfPermutations(
            int[] input,
            int expectedCount
        )
        {
            // arrange
            var sut = new Day7();

            // Act
            var result = sut.GetPermutations(input);

            // Assert
            Assert.Equal(expectedCount, result.Count());
        }

        [Fact]
        public void GetPermutations_VerifySequence()
        {
            // arrange
            var sut = new Day7();
            var input = new int[] { 1, 2, 3 };
            var expected = new[]
            {
                new[] { 1, 2, 3 },
                new[] { 1, 3, 2 },
                new[] { 2, 1, 3 },
                new[] { 2, 3, 1 },
                new[] { 3, 1, 2 },
                new[] { 3, 2, 1 }
            };

            // Act
            var result = sut.GetPermutations(input);

            // Assert
            Assert.Equal(expected, result);
        }
    }
}
