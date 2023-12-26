using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Never Tell Me The Odds")]
    public class Day24
    {
        public int Part1(string input, long min, long max)
        {
            var count = 0;
            var lines = ParseInput(input).ToList();
            for (var a = 0; a < lines.Count - 1; a++) {
                for (var b = a + 1; b < lines.Count; b++) {
                    var line0 = lines[a];
                    var line1 = lines[b];
                    if (IsParallelXY(line0, line1)) continue;
                    var (intersection, t0, t1) = GetIntersectionXY(line0, line1);
                    if (t0 < 0 || t1 < 0) continue;
                    if (min > intersection.X || intersection.X > max) continue;
                    if (min > intersection.Y || intersection.Y > max) continue;
                    count++;
                }
            }
            return count;
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();

        }
        public IEnumerable<Line> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseLine);
        }

        public Line ParseLine(string line) 
        {
            var parts = line.Split(" @ ");
            var originParts = Regex.Split(parts[0], @",\s+");
            var origin = originParts.Select(double.Parse).ToList();
            var dirParts = Regex.Split(parts[1], @",\s+");
            var dir = dirParts.Select(double.Parse).ToList();
            
            var parsed = new Line(
                new Coord<double>(
                    origin[0],
                    origin[1],
                    origin[2]
                ),
                new Coord<double>(
                    dir[0],
                    dir[1],
                    dir[2]
                )
            );

            return parsed;
        }

        public bool IsParallelXY(Line line0, Line line1) {
            // dx1 * dy0 = dy1 * dx0
            var a = line1.Dir.X * line0.Dir.Y;
            var b = line1.Dir.Y * line0.Dir.X;
    
            return a == b;
        }

        public (Coord<double> intersection, double tA, double tB) GetIntersectionXY(Line line0, Line line1)
        {
            // TODO what if lines are parallel, but on top of each other
            if (IsParallelXY(line0, line1)) {
                throw new ArgumentException("Lines are parallel");
            }

            var (t0, t1) = CalcIntersectionTimes(line0, line1);

            var intersection = new Coord<double>(
                line0.Origin.X + line0.Dir.X * t0,
                line0.Origin.Y + line0.Dir.Y * t0,
                line0.Origin.Z + line0.Dir.Z * t0
            );

            return (intersection, t0, t1);
        }

        public (double, double) CalcIntersectionTimes(Line line0, Line line1) {
            // TODO what if trajectory is zero
            // if dx0 == 0
            // if dx1 == 0
            // if dy0 == 0
            // if dy1 == 0

            var t1 = CalcIntersectionT1(line0, line1);
            var t0 = CalcIntersectionT0(line0, line1, t1);

            return (t0, t1);
        }

        public double CalcIntersectionT1(Line line0, Line line1)
        {
            if (line0.Dir.X == 0 && line1.Dir.X != 0) {
                return (line0.Origin.X - line1.Origin.X) / line1.Dir.X;
            }

            var a = line1.Origin.Y - line0.Origin.Y;
            var b = line1.Origin.X - line0.Origin.X;
            var c = line0.Dir.Y / line0.Dir.X;
            var nominator = a - b * c;

            var d = line1.Dir.X * line0.Dir.Y / line0.Dir.X;
            var e = line1.Dir.Y;
            var denominator = d - e;

            var t1 = nominator / denominator;
            return t1;
        }
        public double CalcIntersectionT0(Line line0, Line line1, double t1) {

            var a = line1.Origin.X - line0.Origin.X;
            var b = line1.Dir.X * t1;

            var nominator = a + b;
            var denominator = line0.Dir.X;

            var t0 = nominator / denominator;

            return t0;
        }

        public record Line(Coord<double> Origin, Coord<double> Dir);
        public record Coord<T>(T X, T Y, T Z);
    }
}
