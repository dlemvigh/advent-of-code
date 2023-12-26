using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("Wait For It")]
    public class Day6
    {
        public long Part1(string input)
        {
            var parsed = ParseInput(input);
            var wins = parsed.Select((race) => FindWinningWaitTime(race.time, race.dist));
            var result = wins.Aggregate(1L, (acc, win) => acc * win);
            return result;
        }

        public long Part2(string input)
        {
            var (time, dist) = ParseInput2(input);
            var result = FindWinningWaitTime(time, dist);
            return result;

        }
        public IEnumerable<(long time, long dist)> ParseInput(string input)
        {
            var lines = input.Split("\n");
            var times = Regex.Split(lines[0], @"\s+").Skip(1).Select(long.Parse);
            var dists = Regex.Split(lines[1], @"\s+").Skip(1).Select(long.Parse);
            var pairs = times.Zip(dists);
            return pairs;
        }

        public (long time, long dist) ParseInput2(string input)
        {
            var lines = input.Split("\n");
            var time = long.Parse(lines[0].Split(":")[1].Replace(" ", ""));
            var dist = long.Parse(lines[1].Split(":")[1].Replace(" ", ""));
            return (time, dist);
        }

        public long FindWinningWaitTime(long time, long dist) {
            var (min, max) = SolveQuadraticEquation(1, -time, dist);
            var minCeil = (long) Math.Ceiling(min);
            var maxFloor = (long) Math.Floor(max);
            if (min == minCeil) minCeil += 1;
            if (max == maxFloor) maxFloor -= 1;

            return Math.Max(maxFloor - minCeil + 1, 0);
        }

        public (double, double) SolveQuadraticEquation(double a, double b, double c) {
            var d = b * b - 4 * a * c;

            if (d > 0) {
                var rootA = (-b + Math.Sqrt(d)) / (2 * a);
                var rootB = (-b - Math.Sqrt(d)) / (2 * a);
                var rootMin = Math.Min(rootA, rootB);
                var rootMax = Math.Max(rootA, rootB);
                return (rootMin, rootMax);
            }
            else if (d == 0) {
                var root = - b / (2 * a);
                return (root, root);
            } else {
                throw new InvalidOperationException("Equation has no roots");
            }
        }
    }
}
