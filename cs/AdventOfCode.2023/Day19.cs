using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;
using static System.Net.Mime.MediaTypeNames;

namespace AdventOfCode.Y2023
{
    [ProblemName("Aplenty")]
    public class Day19
    {

        public long Part1(string input)
        {
            var (states, parts) = ParseInput(input);


            var sum = 0L;
            foreach (var part in parts)
            {
                var state = FollowWorkflow(states, part);
                if (state == "A")
                {
                    sum += SumPart(part);
                }
            }

            return sum;
        }

        public long Part2(string input)
        {
            var (states, _) = ParseInput(input);
            var parts = FollowAllWorkflowRanges(states);
            var sum = SumPartRanges(parts);
            return sum;
        }

        public IEnumerable<PartRange> FollowAllWorkflowRanges(Dictionary<string, State> states)
        {
            var initRange = new PartRange
            {
                ["x"] = new Range(1, 4000),
                ["m"] = new Range(1, 4000),
                ["a"] = new Range(1, 4000),
                ["s"] = new Range(1, 4000),
            };
            var initState = "in";

            var queue = new Queue<(string state, PartRange part)>();
            queue.Enqueue((initState, initRange));

            var acceptedRanged = new List<PartRange>();

            while (queue.Count > 0)
            {
                var (state, range) = queue.Dequeue();
                foreach (var (nextState, nextRange) in GetNextRanges(range, states[state]))
                {
                    if (nextRange == null) continue;
                    if (nextState == "A") { acceptedRanged.Add(nextRange); continue; }
                    if (nextState == "R") { continue; }
                    queue.Enqueue((nextState, nextRange));
                }
            }

            return acceptedRanged;
        }

        public IEnumerable<(string state, PartRange range)> GetNextRanges(PartRange range, State state)
        {
            var nextRange = new PartRange(range);
            foreach (var edge in state.edges)
            {
                if (edge.cond == null)
                {
                    yield return (edge.state, nextRange);
                    continue;
                }
                var trueRange = new PartRange(nextRange);
                var falseRange = new PartRange(nextRange);
                if (edge.cond.op == ">")
                {
                    if (edge.cond.value >= nextRange[edge.cond.arg].max) continue; 
                    if (edge.cond.value < nextRange[edge.cond.arg].min)
                    {
                        yield return (edge.state, nextRange);
                        break;
                    }
                    trueRange[edge.cond.arg] = new Range(edge.cond.value + 1, nextRange[edge.cond.arg].max);
                    falseRange[edge.cond.arg] = new Range(nextRange[edge.cond.arg].min, edge.cond.value);
                }
                else if (edge.cond.op == "<")
                {
                    if (edge.cond.value <= nextRange[edge.cond.arg].min) continue;
                    if (edge.cond.value > nextRange[edge.cond.arg].max)
                    {
                        yield return (edge.state, nextRange);
                        break;
                    }
                    trueRange[edge.cond.arg] = new Range(nextRange[edge.cond.arg].min, edge.cond.value - 1);
                    falseRange[edge.cond.arg] = new Range(edge.cond.value, nextRange[edge.cond.arg].max);
                }
                else
                {
                    throw new NotImplementedException();
                }
                if (trueRange[edge.cond.arg].min <= trueRange[edge.cond.arg].max)
                {
                    yield return (edge.state, trueRange);
                }
                nextRange = falseRange;
            }
        }

        public long SumParts(IEnumerable<Part> parts)
        {
            return parts.Select(SumPart).Sum();
        }

        public long SumPartRanges(IEnumerable<PartRange> parts)
        {
            return parts.Select(SumPartRange).Sum();
        }

        public long SumPartRange(PartRange part)
        {
            return part.Values.Select(x => x.max - x.min + 1).Aggregate(1L, (a, b) => a * b);
        }

        public long SumPart(Part p)
        {
            return p.Values.Sum();
        }

        public string FollowWorkflow(Dictionary<string, State> states, Part part)
        {
            var state = "in";
            while (states.ContainsKey(state))
            {
                var edges = states[state].edges;
                var edge = edges.FirstOrDefault(e => e.cond?.test.Invoke(part) ?? true);
                if (edge == null)
                    throw new Exception("No matching edge found");
                state = edge.state;
            }
            return state;
        }

        public (Dictionary<string, State> states, IEnumerable<Part> parts) ParseInput(string input)
        {
            var inputParts = input.Split("\n\n");

            var states = ParseStates(inputParts[0]);
            var parts = ParseParts(inputParts[1]);

            return (states, parts);
        }

        public Dictionary<string, State> ParseStates(string input) { 
            return input.Split("\n").Select(ParseState).ToDictionary(s => s.name, s => s);
        }
        private static Regex ParseStateRegex = new Regex( @"^(?<state>\w+){(?<cond>[^}]+)}$", RegexOptions.Compiled);
        public static State ParseState(string line) { 
            var match = ParseStateRegex.Match(line);
            if (!match.Success)
                throw new ArgumentException("Invalid input", nameof(line));

            var state = match.Groups["state"].Value;
            var edges = match.Groups["cond"].Value.Split(",").Select(ParseEdge);

            return new State(state, edges);
        }

        private static Regex ParseEdgeRegex = new Regex(@"(?<cond>(?<arg>([xmas]))(?<op>[<>])(?<value>\d+):)?(?<state>\w+)", RegexOptions.Compiled);
        public static Edge ParseEdge(string line) { 
            var match = ParseEdgeRegex.Match(line);
            if (!match.Success)
                throw new ArgumentException("Invalid input", nameof(line));

            var state = match.Groups["state"].Value;

            if (!match.Groups["cond"].Success)
            {
                return new Edge(null, state);
            }

            var arg = match.Groups["arg"].Value;
            var op = match.Groups["op"].Value;
            var value = int.Parse(match.Groups["value"].Value);

            Func<Part, bool> test = op switch
            {
                "<" => (p => p[arg] < value),
                ">" => (p => p[arg] > value),
                _ => throw new ArgumentException("Invalid input", nameof(line)),
            };

            return new Edge(
                new EdgeCond(
                    arg,
                    op,
                    value,
                    test),
                state);
        }

        private static Regex ParsePartRegex = new Regex(
            @"{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}",
            RegexOptions.Compiled
        );
        public IEnumerable<Part> ParseParts(string input)
        {
            return input.Split("\n").Select(ParsePart);
        }
        public Part ParsePart(string line)
        {
            var match = ParsePartRegex.Match(line);
            if (!match.Success)
                throw new ArgumentException("Invalid input", nameof(line));

            return new Part
            {
                ["x"] = int.Parse(match.Groups["x"].Value),
                ["m"] = int.Parse(match.Groups["m"].Value),
                ["a"] = int.Parse(match.Groups["a"].Value),
                ["s"] = int.Parse(match.Groups["s"].Value),
            };
        }

        public record State(string name, IEnumerable<Edge> edges);

        public record Edge(EdgeCond? cond, string state);
        public record EdgeCond(string arg, string op, int value, Func<Part, bool>  test);

        public class Part : Dictionary<string, int> { }
        public record Range(int min, int max);
        public class PartRange : Dictionary<string, Range> { 
            public PartRange() { }
            public PartRange(PartRange other) : base(other) { }
        }
    }
}
