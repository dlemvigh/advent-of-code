using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Hill Climbing Algorithm")]
    public class Day12
    {
        public int Part1(string input)
        {
            var map = ParseInput(input);
            // find src
            var src = Find(map, "S");
            // find dest
            var dest = Find(map, "E");

            var dist = map.Select(row => Enumerable.Repeat(int.MaxValue, row.Length).ToArray()).ToArray();
            dist[src.row][src.col] = 0;

            // do breadth first search
            var queue = new Queue<(int row, int col)>();
            queue.Enqueue(src);

            while (queue.Count > 0)
            {
                var (row, col) = queue.Dequeue();
                foreach (var near in GetNear(row, col))
                {

                    if (!InBounds(near.row, near.col, map)) continue;
                    if (!Reachable(map[row][col], map[near.row][near.col])) continue;

                    var d = dist[row][col] + 1;
                    if (d < dist[near.row][near.col])
                    {
                        dist[near.row][near.col] = d;
                        queue.Enqueue(near);
                    }
                }
            }

            // return distance to dest
            var result = dist[dest.row][dest.col];
            if (result == int.MaxValue) throw new Exception("Unable to reach destination");
            return result;
        }

        public int Part2(string input)
        {
            var map = ParseInput(input);
            // find src
            var src = Find(map, "S");
            // find dest
            var dest = Find(map, "E");

            var dist = map.Select(row => Enumerable.Repeat(int.MaxValue, row.Length).ToArray()).ToArray();
            dist[dest.row][dest.col] = 0;

            // do breadth first search
            var queue = new Queue<(int row, int col)>();
            queue.Enqueue(dest);

            while (queue.Count > 0)
            {
                var (row, col) = queue.Dequeue();
                foreach (var near in GetNear(row, col))
                {

                    if (!InBounds(near.row, near.col, map)) continue;
                    if (!Reachable(map[near.row][near.col], map[row][col])) continue;

                    var d = dist[row][col] + 1;
                    if (d < dist[near.row][near.col])
                    {
                        dist[near.row][near.col] = d;
                        queue.Enqueue(near);
                    }
                }
            }

            // find smallest
            var result = int.MaxValue;
            for (var row = 0; row < map.Length; row++)
            {
                for (var col = 0; col < map[row].Length; col++)
                {
                    if (map[row][col] == 'a' && dist[row][col] < result)
                    {
                        result = dist[row][col];
                    }
                }
            }

            // return distance to dest
            if (result == int.MaxValue) throw new Exception("Unable to reach destination");
            return result;
        }
        public bool InBounds(int row, int col, string[] map)
        {
            return
                0 <= row && row < map.Length &&
                0 <= col && col < map[row].Length;
        }

        public bool Reachable(char src, char dest)
        {
            var replace = (char value) =>
            {
                switch (value)
                {
                    case 'S': return 'a';
                    case 'E': return 'z';
                    default: return value;
                }
            };

            src = replace(src);
            dest = replace(dest);

            var diff = dest - src;
            return diff <= 1;
        }

        public IEnumerable<(int row, int col)> GetNear(int row, int col)
        {
            yield return (row + 1, col);
            yield return (row - 1, col);
            yield return (row, col + 1);
            yield return (row, col - 1);
        }

        public IEnumerable<(int, int)> Clamp(IEnumerable<(int row, int col)> coords, string[] map)
        {
            return coords.Where(coord => 
                0 <= coord.row && coord.row < map.Length && 
                0 <= coord.col && coord.col < map[coord.row].Length
            );
        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public (int row, int col) Find(string[] map, string target)
        {
            for (var row = 0; row < map.Length; row++)
            {
                var col = map[row].IndexOf(target);
                if (col >= 0)
                {
                    return (row, col);
                }

            }
            throw new ArgumentException("Unable to find target", nameof(target));
        }
    }

}
