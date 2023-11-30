using AdventOfCode.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AdventOfCode.Y2022
{
    [ProblemName("Beacon Exclusion Zone")]
    public class Day14
    {
        public readonly record struct Coord(int x, int y);
        public readonly record struct Range(int from, int to);

        public int Part1(string input, int row)
        {
            var lines = this.ParseInput(input);
            var ranges = new List<Range>();

            foreach (var line in lines)
            {
                var range = this.GetOverlap(line.sensor, line.beacon, row);
                //var dist = this.GetDistance(line.sensor, line.beacon);
                //var range = GetOverlapRange(line.sensor, dist, row);

                if (range.HasValue)
                {
                    var overlaps = ranges.Where(x => this.GetHasOverlap(x, range.Value)).ToList();
                    foreach (var overlap in overlaps)
                    {
                        ranges.Remove(overlap);
                        range = this.MergeRanges(overlap, range.Value);
                    }
                    ranges.Add(range.Value);
                }
            }

            return this.GetRangeCoverage(ranges);
        }

        public IEnumerable<(Coord sensor, Coord beacon)> ParseInput(string input)
        {
            return input.Split("\n").Select(this.ParseLine);
        }

        public (Coord sensor, Coord beacon) ParseLine(string line)
        {
            var pattern = @"Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)";
            var match = Regex.Match(line, pattern);

            if (!match.Success)
            {
                throw new Exception("Unable to parse input");
            }

            var sensor = new Coord(
                int.Parse(match.Groups["sx"].Value),
                int.Parse(match.Groups["sy"].Value)
            );
            var beacon = new Coord(
                int.Parse(match.Groups["bx"].Value),
                int.Parse(match.Groups["by"].Value)
            );

            return (sensor, beacon);
        }

        public Range MergeRanges(Range a, Range b) {
            if (!this.GetHasOverlap(a, b)) {
                throw new ArgumentException("ranges do not overlap");
            }

            var from = Math.Min(a.from, b.from);
            var to = Math.Max(a.to, b.to);

            return new Range(from, to);
        }

        public int GetDistance(Coord sensor, Coord beacon)
        {
            var dx = Math.Abs(beacon.x - sensor.x);
            var dy = Math.Abs(beacon.y - sensor.y);
            return dx + dy;
        }

        public Range? GetOverlapRange(Coord sensor, int distance, int row) {
            var rowDist = Math.Abs(row - sensor.y);
            if (rowDist > distance)
            {
                return null;
            }

            var excessDist = distance - rowDist;

            return new Range(sensor.x - excessDist, sensor.x + excessDist);
        }

        public Range? GetOverlap(Coord sensor, Coord beacon, int row)
        {
            var dist = this.GetDistance(sensor, beacon);
            var range = this.GetOverlapRange(sensor, dist, row);
            return range;
        }

        public bool GetHasOverlap(Range a, Range b)
        {
            return a.from <= b.to && a.to >= b.from;
        }

        public int GetRangeCoverage(IEnumerable<Range> ranges)
        {
            return ranges.Aggregate(0, (sum, range) =>
            {
                return sum + range.to - range.from;
            });
        }
    }

}
