using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day8
    {
        public int Part1(string input)
        {
            var (steps, nodes) = ParseInput(input);
            var count = FollowSteps(steps, nodes, "AAA", "ZZZ");
            return count;
        }

        public long Part2(string input)
        {
            var (steps, nodes) = ParseInput(input);
            var count = FollowGhostSteps(steps, nodes, "A", "Z");
            return count;

        }

        public int FollowSteps(string steps, Dictionary<string, Node> nodes, string src, string dest)
        {
            var count = 0;
            var node = nodes[src] ?? throw new ArgumentException("Unable to find src node", nameof(src));

            while (node!.Name != dest)
            {
                if (steps[count % steps.Length] == 'L')
                {
                    node = node.Left;
                }
                else
                {
                    node = node.Right;
                }
                count++;
            }

            return count;
        }


        public long GCD(long a, long b)
        {
            if (b == 0) return a;
            return GCD(b, a % b);
        }


        public long GetLoopSize(string steps, Node node)
        {
            var visited = new HashSet<Node>();

            int tailIndex = 0;
            while (!visited.Contains(node) )
            {
                visited.Add(node);
                foreach (var step in steps)
                {
                    node = Step(node, step);
                    tailIndex++;
                }
            }

            var loopNode = node;
            var loopIndex = 0;
            while (node != loopNode || loopIndex == 0)
            {
                foreach (var step in steps)
                {
                    node = Step(node, step);
                    loopIndex++;
                }
            }


            return loopIndex;
        }

        public Node Step(Node node, string steps, int step)
        {
            return Step(node, steps[step % steps.Length]);
        }

        public Node Step(Node node, char step)
        {
            if (step == 'L')
            {
                return node.Left ?? throw new ArgumentException("Node does not have a left child");
            }
            else
            {
                return node.Right ?? throw new ArgumentException("Node does not have a right child");
            }
        }   

        public long FollowGhostSteps(string steps, Dictionary<string, Node> nodes, string src, string dest)
        {
            var ghosts = nodes.Where(x => x.Value.Name.EndsWith(src)).Select(x => x.Value).ToArray();

            var loops = new Queue<long>(ghosts.Select(ghost => GetLoopSize(steps, ghost)));

            while (loops.Count() > 1)
            {
                var a = loops.Dequeue();
                var b = loops.Dequeue();
                var gcd = GCD(a, b);
                var lcm = a * b / gcd;
                loops.Enqueue(lcm);
            }

            return loops.Dequeue();
        }

        public (string steps, Dictionary<string, Node> nodes) ParseInput(string input)
        {
            var lines = input.Split("\n");
            var steps = lines[0];

            var nodes = ParseNodes(lines.Skip(2));

            return (steps, nodes);
        }

        public Dictionary<string, Node> ParseNodes(IEnumerable<string> lines)
        {
            var nodes = new Dictionary<string, Node>();
            var parsed = lines.Select(ParseNode);

            foreach (var info in parsed)
            {
               nodes.Add(info.name, new Node { Name = info.name });
            }
            foreach (var info in parsed)
            {
                var node = nodes[info.name];
                node.Left = nodes[info.left];
                node.Right = nodes[info.right];
            }

            return nodes;
        }

        public (string name, string left, string right) ParseNode(string line)
        {
            // parse line with format "AAA = (BBB, CCC)" into name = (left, right)
            var match = Regex.Match(line, @"(\w+) = \((\w+), (\w+)\)");
            var name = match.Groups[1].Value;
            var left = match.Groups[2].Value;
            var right = match.Groups[3].Value;
            return (name, left, right);
        }

        public class Node
        {
            public required string Name { get; init; }
            public Node? Left { get; set; }
            public Node? Right { get; set; }
        }
    }
}
