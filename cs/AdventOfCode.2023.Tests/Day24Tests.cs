using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;
using static AdventOfCode.Y2023.Day24;

namespace AdventOfCode2023.Tests
{
    public class Day24Tests
    {
        [Theory]
        [InlineData("0, 0, 0 @ 0, 0, 0", 0, 0, 0, 0, 0, 0)]
        [InlineData("1, 2, 3 @ 4, 5, 6", 1, 2, 3, 4, 5, 6)]
        [InlineData("-1, -2, -3 @ -4, -5, -6", -1, -2, -3, -4, -5, -6)]
                                                                                                                                                                                                                                                                                                                             public void ParseLine(string input, int x, int y, int z, int dx, int dy, int dz) {
            // arrange
            var expected = new Line(new Coord<double>(x, y, z), new Coord<double>(dx, dy, dz));
            var sut = new Day24();

            // act
            var actual = sut.ParseLine(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(1, 1, 1, 1, true)]
        [InlineData(-1, 1, 1, 1, false)]
        [InlineData(1, -1, 1, 1, false)]
        [InlineData(1, 1, -1, 1, false)]
        [InlineData(1, 1, 1, -1, false)]
        [InlineData(1, 1, -1, -1, true)]
        [InlineData(-1, -1, 1, 1, true)]
        [InlineData(-1, -1, -1, -1, true)]
        [InlineData(1, 1, 2, 2, true)]
        [InlineData(2, 2, 3, 3, true)]
        public void IsParallelXY(long x0, long y0, long x1, long y1, bool expected) 
        {
            // arrange 
            var lineA = new Line(
                new Coord<double>(0, 0, 0),
                new Coord<double>(x0, y0, 0)
            );
            var lineB = new Line(
                new Coord<double>(0, 0, 0),
                new Coord<double>(x1, y1, 0)
            );
            var sut = new Day24();

            // act
            var actual = sut.IsParallelXY(lineA, lineB);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        // both lines origin 0,0, directions does not matter
        [InlineData(
            0, 0, 1, 2,
            0, 0, 2, 1,
            0, 0, 0, 0
        )]
        // [InlineData(
        //     0, 0, 0, 1,
        //     0, 0, 1, 0,
        //     0, 0, 0, 0
        // )]
        // [InlineData(
        //     0, 0, 0, 2,
        //     0, 0, 2, 0,
        //     0, 0, 0, 0
        // )]
        // intersect at 2,2 in all combinations of past/future
        [InlineData(
            0, 1, 2, 1,
            1, 0, 1, 2,
            2, 2, 1, 1
        )]
        [InlineData(
            0, 1, -2, -1,
            1, 0, 1, 2,
            2, 2, -1, 1
        )]
        [InlineData(
            0, 1, 2, 1,
            1, 0, -1, -2,
            2, 2, 1, -1
        )]
        [InlineData(
            0, 1, -2, -1,
            1, 0, -1, -2,
            2, 2, -1, -1
        )]
        // intersect at 1,1 in all combinations of past/future
        // [InlineData(
        //     0, 1, 1, 0,
        //     1, 0, 0, 1,
        //     1, 1, 1, 1
        // )]
        // [InlineData(
        //     0, 1, -1, 0,
        //     1, 0, 0, 1,
        //     1, 1, -1, 1
        // )]
        // [InlineData(
        //     0, 1, 1, 0,
        //     1, 0, 0, -1,
        //     1, 1, 1, -1
        // )]
        // [InlineData(
        //     0, 1, -1, 0,
        //     1, 0, 0, -1,
        //     1, 1, -1, -1
        // )]
        public void GetIntersectionXY(
            // input
            long x0, long y0, long dx0, long dy0,
            long x1, long y1, long dx1, long dy1,
            // expected 
            double x, double y, 
            double t0, double t1) 
        {
            // arrange 
            var lineA = new Line(
                new Coord<double>(x0, y0, 0),
                new Coord<double>(dx0, dy0, 0)
            );
            var lineB = new Line(
                new Coord<double>(x1, y1, 0),
                new Coord<double>(dx1, dy1, 0)
            );
            var expected = (new Coord<double>(x, y, 0), t0, t1);
            var sut = new Day24();

            // act
            var actual = sut.GetIntersectionXY(lineA, lineB);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        // lines are parallel
        [InlineData(
            0, 1, 1, 1,
            1, 0, 1, 1
        )]
        [InlineData(
            0, 1, 1, 1,
            1, 0, -1, -1
        )]
        [InlineData(
            0, 1, -1, -1,
            1, 0, 1, 1
        )]
        [InlineData(
            0, 1, -1, -1,
            1, 0, -1, -1
        )]
         // lines are parallel on top of each other
        [InlineData(
            0, 0, 1, 1,
            0, 0, 1, 1
        )]
        [InlineData(
            0, 0, 1, 1,
            1, 1, 1, 1
        )]
        [InlineData(
            0, 0, 1, 1,
            2, 2, 1, 1
        )]
        public void GetIntersectionXY_Parallel(
            // input
            long x0, long y0, long dx0, long dy0,
            long x1, long y1, long dx1, long dy1) 
        {
            // arrange 
            var lineA = new Line(
                new Coord<double>(x0, y0, 0),
                new Coord<double>(dx0, dy0, 0)
            );
            var lineB = new Line(
                new Coord<double>(x1, y1, 0),
                new Coord<double>(dx1, dy1, 0)
            );
            var sut = new Day24();

            // act
            Assert.Throws<ArgumentException>(() => sut.GetIntersectionXY(lineA, lineB));
        }

        [Theory]
        [FileTestData("Day24/sample.in", 7, 27, 2)]
        [FileTestData("Day24/input.in", 200000000000000L, 400000000000000L, 18184)]
        public void Part1(string input, long min, long max, int expected)
        {
            // arrange 
            var sut = new Day24();

            // act
            var actual = sut.Part1(input, min, max);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day24/sample.in", 4)]
        [FileTestData("Day24/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day24();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
