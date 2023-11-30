using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Y2022;

namespace AdventOfCode.Tests.Y2022
{
    public class Day14Tests
    {
        private readonly Day14 sut = new Day14();

        [Theory]
        [FileTestData("Day14/sample.in", 10, 26)]
        [FileTestData("Day14/input.in", 2_000_000, 4737567)]
        public void Part1(string input, int row, int expected)
        {
            Assert.Equal(expected, sut.Part1(input, row));
        }

        //[Theory]
        //[FileTestData("Day12/sample.in", 29)]
        //[FileTestData("Day12/input.in", 488)]
        //public void Part2(string input, int expected)
        //{
        //    Assert.Equal(expected, sut.Part2(input));
        //}

        [Theory]
        [InlineData("Sensor at x=1, y=2: closest beacon is at x=3, y=4", 1, 2, 3, 4)]
        [InlineData("Sensor at x=2, y=18: closest beacon is at x=-2, y=15", 2, 18, -2, 15)]
        [InlineData("Sensor at x=-1, y=-2: closest beacon is at x=-3, y=-4", -1, -2, -3, -4)]
        public void Part1_ParseLine(string line, int sx, int sy, int bx, int by)
        {
            var (sensor, beacon) = sut.ParseLine(line);
            Assert.Equal(sx, sensor.x);
            Assert.Equal(sy, sensor.y);
            Assert.Equal(bx, beacon.x);
            Assert.Equal(by, beacon.y);
        }

        [Theory]
        [InlineData(0, 10, 10, 20, 0, 20)]
        [InlineData(10, 20, 0, 10, 0, 20)]
        [InlineData(0, 10, 5, 15, 0, 15)]
        public void Part1_MergeRanges(int a, int b, int c, int d, int from, int to)
        {
            var range = sut.MergeRanges(new Day14.Range(a, b), new Day14.Range(c, d));
            Assert.Equal(new Day14.Range(from, to), range);
        }

        [Theory]
        [InlineData(0, 0, 10, 10, 20)]
        [InlineData(10, 10, 0, 0, 20)]
        [InlineData(0, 0, 0, 10, 10)]
        [InlineData(0, 0, 10, 0, 10)]
        public void Part1_GetDistance(int sx, int sy, int bx, int by, int expected)
        {
            var sensor = new Day14.Coord(sx, sy);
            var beacon = new Day14.Coord(bx, by);
            Assert.Equal(expected, sut.GetDistance(sensor, beacon));
        }

        [Theory]
        [InlineData(0, 0, 0, 0, 0, 0)]
        [InlineData(0, 0, 10, 0, -10, 10)]
        [InlineData(5, 5, 5, 10, 5, 5)]
        [InlineData(5, 5, 10, 10, 0, 10)]
        public void Part1_GetOverlapRange_HasOverlap(int sx, int sy, int distance, int row, int from, int to)
        {
            var sensor = new Day14.Coord(sx, sy);
            Day14.Range? expected = new Day14.Range(from, to);
            Assert.Equal(expected, sut.GetOverlapRange(sensor, distance, row));
        }

        [Theory]
        [InlineData(0, 0, 0, 10)]
        [InlineData(0, 0, 9, 10)]
        public void Part1_GetOverlapRange_NoOverlap(int sx, int sy, int distance, int row)
        {
            var sensor = new Day14.Coord(sx, sy);
            Assert.Null(sut.GetOverlapRange(sensor, distance, row));
        }

        [Theory]
        [InlineData(0, 0, 10, 10, false)]
        [InlineData(0, 10, 10, 20, true)]
        [InlineData(0, 10, -10, 0, true)]
        [InlineData(0, 10, 5, 5, true)]
        [InlineData(5, 5, 0, 10, true)]
        [InlineData(0, 10, 5, 15, true)]
        [InlineData(10, 20, 5, 15, true)]
        public void Part1_GetHasOverlap(int ax, int ay, int bx, int by, bool expected)
        {
            var a = new Day14.Range(ax, ay);
            var b = new Day14.Range(bx, by);
            Assert.Equal(expected, sut.GetHasOverlap(a, b));
        }

        [Theory]
        [InlineData(10,8,7,2,10,2,14)]
        [InlineData(10,2,18,-2,15, null, null)]
        [InlineData(10, 9, 16, 10, 16, null, null)]
        [InlineData(10,0,11,2,10,-2,2)]
        public void Part1_GetOverlap(int row, int sx, int sy, int bx, int by, int? from, int ?to) {
            var sensor = new Day14.Coord(sx, sy);
            var beacon = new Day14.Coord(bx, by);
            Day14.Range? expected = from.HasValue && to.HasValue ? new Day14.Range(from.Value, to.Value) : null;
            Assert.Equal(expected, sut.GetOverlap(sensor, beacon, row));
        }
    }

}
