using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("Snowverload")]
    public class Day25
    {
        public int Part1(string input, int target = 3)
        {
            Graph graph;
            while (true)
            {
                graph = ParseInput(input);
                ContractGraph(graph);
                if (graph.First().Value.Count == target)
                {
                    break;
                }
            }
            var keys = graph.Keys.Select(key => key.Split(",")).ToList();
            var result = keys[0].Length * keys[1].Length;
            return result;
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();
        }

        public Graph ContractGraph(Graph graph, int size = 2)
        {
            while (graph.Count > size)
            {
                var (src, dest) = PickRandomEdge(graph);
                MergeNodes(graph, src, dest);
            }
            return graph;
        }

        public (string src, string dest) PickRandomEdge(Graph graph)
        {
            var src = graph.Keys.ElementAt(new Random().Next(graph.Keys.Count));
            var dest = graph[src].ElementAt(new Random().Next(graph[src].Count));
            return (src, dest);
        }

        public void MergeNodes(Graph graph, string src, string dest)
        {
            var node = src + "," + dest;
            var edges = graph[src].Concat(graph[dest]).Where(x => x != src && x != dest).ToList();
            //var edges = graph[src].Concat(graph[dest]).ToList();
            graph[node] = edges;
            foreach(var edge in edges)
            {
                graph[edge].Remove(src);
                graph[edge].Remove(dest);
                if (edge == src || edge == dest) throw new Exception("Why?");
                graph[edge].Add(node);
            }
            graph.Remove(src);
            graph.Remove(dest);
        }

        public static Graph ParseInput(string input)
        {
            var graph = new Graph();
            var lines = input.Split("\n");

            foreach(var line in lines)
            {
                var parts = line.Split(": ");
                var src = parts[0];
                if (!graph.ContainsKey(src))
                {
                    graph[src] = new List<string>();
                }

                foreach (var dst in parts[1].Split(" "))
                {
                    if (string.IsNullOrEmpty(dst)) continue;
                    if (!graph.ContainsKey(dst))
                    {
                        graph[dst] = new List<string>();
                    }

                    graph[src].Add(dst);
                    graph[dst].Add(src);
                }
            }

            return graph;
        }

        public class Graph : Dictionary<string, IList<string>> { }
    }
}
