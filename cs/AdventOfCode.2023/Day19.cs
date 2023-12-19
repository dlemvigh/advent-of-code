using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
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

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();
        }

        public long SumParts(IEnumerable<Part> parts)
        {
            return parts.Select(SumPart).Sum();
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
                var edge = edges.FirstOrDefault(e => e.cond?.Invoke(part) ?? true);
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
        public State ParseState(string line) { 
            var match = ParseStateRegex.Match(line);
            if (!match.Success)
                throw new ArgumentException("Invalid input", nameof(line));

            var state = match.Groups["state"].Value;
            var edges = match.Groups["cond"].Value.Split(",").Select(ParseEdge);

            return new State(state, edges);
        }

        private static Regex ParseEdgeRegex = new Regex(@"(?<cond>(?<arg>([xmas]))(?<op>[<>])(?<value>\d+):)?(?<state>\w+)", RegexOptions.Compiled);
        public Edge ParseEdge(string line) { 
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

            switch (op)
            {
                case ("<"): return new Edge(p => p[arg] < value, state);
                case (">"): return new Edge(p => p[arg] > value, state);
                default: throw new ArgumentException("Invalid input", nameof(line));
            }
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

        public record Edge(Func<Part, bool>? cond, string state);
        public record EdgeCond(string arg, int? min, int? max);

        public class Part : Dictionary<string, int> { }
        public record Range(int min, int max);
    }
}
