using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("A Long Walk")]
    public class Day23
    {
        public int Part1(string input)
        {
            var map = ParseInput(input);
            var graph = MapToGraph(map);
            // find start (top row)
            // find end (bottom row)
            // map to directed graph
                // follow path to intersection
                // follow all paths from intersection
                // repeat until end
            // find longest path in directed graph
            throw new NotImplementedException();
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();

        }

        public Node FindStart(IList<string> map)
        {
            var row = 0;
            var col = map[row].IndexOf('.');

            if (col == -1) throw new Exception("No start found");

            return new Node(row, col);
        }

        public Node FindEnd(IList<string> map)
        {
            var row = map.Count - 1;
            var col = map[row].IndexOf('.');

            if (col == -1) throw new Exception("No end found");
            
            return new Node(row, col);
        }

        public Graph MapToGraph(IList<string> map)
        {
            var g = new Graph();
            var start = FindStart(map);
            var end = FindEnd(map);

            var visited = new HashSet<Node> { start };
            var queue = new Queue<(Node, Node)>();
            queue.Enqueue((start, new Node(start.Row + 1, start.Col)));

            Action<Node, Node> FollowPath = (from, node) => {
                var dist = 1;
                
                while (!(node == end || IsIntersection(map, node))) {
                    foreach (var near in GetNear(map, node))
                    {
                        if (visited.Contains(near)) continue;
                        if (map[near.Row][near.Col] == '#') continue;
                        dist++;
                        node = near;
                        visited.Add(node);
                        break;
                    }
                }
                var to = node;     
                if (g.ContainsKey(from) == false) g[from] = new List<Edge>();
                g[from].Add(new Edge(from, to, dist));

                if (node == end) return;
                var up = new Node(node.Row - 1, node.Col);
                if (map[up.Row][up.Col] == '^') queue.Enqueue((node, up));

                var right = new Node(node.Row, node.Col + 1);
                if (map[right.Row][right.Col] == '>') queue.Enqueue((node, right));

                var down = new Node(node.Row + 1, node.Col);
                if (map[down.Row][down.Col] == 'v') queue.Enqueue((node, down));

                var left = new Node(node.Row, node.Col - 1);
                if (map[left.Row][left.Col] == '<') queue.Enqueue((node, left));
            };

            while (queue.Count > 0)
            {
                var (prev, node) = queue.Dequeue();
                visited.Add(prev);
                visited.Add(node);
                FollowPath(prev, node);
            }

            return g;
        }

        public bool IsIntersection(IList<string> map, Node node)
        {
            if (map[node.Row][node.Col] != '.') return false;
            
            var near = GetNear(map, node).Select(x => map[x.Row][x.Col]);
            var slopes = near.Where(x => "<>^>v".Contains(x));

            return slopes.Count() >= 2;
        }

        /// <summary>
        /// Get all edges from a node (up, right, down, left)
        /// </summary>
        public IEnumerable<Node> GetNear(IList<string> map, Node node)
        {
            var row = node.Row;
            var col = node.Col;
            if (row > 0) yield return new Node(row - 1, col);
            if (col < map[row].Length - 1) yield return new Node(row, col + 1);
            if (row < map.Count - 1) yield return new Node(row + 1, col);
            if (col > 0) yield return new Node(row, col - 1);
        }

        public IList<string> ParseInput(string input)
        {
            return input.Split("\n");
        }

        public record Node(int Row, int Col);
        public record Edge(Node From, Node To, int Dist);
        public class Graph : Dictionary<Node, List<Edge>> {}
    }
}
