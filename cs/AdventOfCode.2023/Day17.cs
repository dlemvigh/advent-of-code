using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day17
    {

        public int StepMaxLimit { get; init; } = 3;
        public int StepMinLimit { get; init; } = 0;

        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var src = (row: 0, col: 0);
            var dest = (row: parsed.Length - 1, col: parsed[0].Length - 1);
            var result = FindMinHeatLossPath(parsed, src, dest);
            return result;
        }

        public int Part2(string input)
        {
            return Part1(input);

        }
        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public int FindMinHeatLossPath(string[] map, (int row, int col) src, (int row, int col) dest)
        {
            var initialState = new State(src.row, src.col, 0, Dir.Right, 0);
            var visited = InitializeVisited(map);
            visited[(initialState.row, initialState.col)].Add(initialState);

            var queue = new Queue<State>();
            queue.Enqueue(initialState);

            while (queue.Count > 0)
            {
                var state = queue.Dequeue();

                foreach (var dir in GetNextDir(state))
                {
                    var nextState = GetNextState(state, dir, map);
                    if (nextState == null) { continue; }

                    var bestStates = visited[(nextState.row, nextState.col)];

                    var isBetter = IsCandidateBetter(nextState, bestStates);
                    if (isBetter)
                    {
                        UpdateBestStates(nextState, bestStates);
                        queue.Enqueue(nextState);

                    }
                }
            }
            var result = visited[(dest.row, dest.col)].Where(x => x.straightDist >= StepMinLimit).MinBy(state => state.dist);
            return result.dist;
        }

        public Dictionary<(int row, int col), List<State>> InitializeVisited(string[] map)
        {
            return Enumerable
                .Range(0, map.Length)
                .SelectMany(row => Enumerable
                    .Range(0, map[0].Length)
                    .Select(col => (row, col)))
                .ToDictionary(pos => pos, pos => new List<State>());
        }

        public State GetVisited(int row, int col, Dictionary<(int row, int col), List<State>> visited)
        {
            return visited[(row, col)].FirstOrDefault();
        }

        public IEnumerable<(int row, int col)> GetPath(State state)
        {
            yield return (state.row, state.col);
            var prev = state.prev;
            while (prev != null)
            {
                yield return (prev.row, prev.col);
                prev = prev.prev;
            }
        }

        public IEnumerable<Dir> GetNextDir(State state)
        {
            if (state.straightDist < StepMaxLimit)
            {
                yield return state.dir;
            }

            if (state.straightDist >= StepMinLimit)
            {
                switch (state.dir)
                {
                    case Dir.Up:
                    case Dir.Down:
                        yield return Dir.Left;
                        yield return Dir.Right;
                        break;
                    case Dir.Left:
                    case Dir.Right:
                        yield return Dir.Up;
                        yield return Dir.Down;
                        break;
                    default:
                        throw new Exception("Unknown dir");
                }
            }
        }

        public int? GetHeatDiff(int row, int col, string[] map)
        {
            if (row < 0 || row >= map.Length || col < 0 || col >= map[0].Length)
            {
                return null;
            }

            var heatDiff = map[row][col] - '0';
            return heatDiff;
        }

        public State? GetNextState(State state, Dir dir, string[] map)
        {
            var (dr, dc) = GetDir(dir);
            var (row, col) = (state.row + dr, state.col + dc);

            var heatDiff = GetHeatDiff(row, col, map);
            if (!heatDiff.HasValue)
            {
                return null;
            }

            var dist = state.dist + heatDiff.Value;

            var straightDist = state.dir == dir ? state.straightDist + 1 : 1;

            return new State(row, col, dist, dir, straightDist, state);
        }

        public bool IsCandidateBetter(State candidateState, IEnumerable<State>? bestStates)
        {
            if (bestStates == null) { return true; }
            var comparableStates = bestStates.Where(bestState => bestState.dir == candidateState.dir && bestState.straightDist == candidateState.straightDist);
            if (comparableStates.Count() == 0) { return true; }


            return comparableStates.Any(bestState => candidateState.dist < bestState.dist);
        }
        public void UpdateBestStates(State candidateState, List<State> bestStates)
        {
            var isBetter = IsCandidateBetter(candidateState, bestStates);
            bestStates.RemoveAll(bestState => 
                bestState.dir == candidateState.dir && 
                bestState.straightDist >= candidateState.straightDist &&
                bestState.dist >= candidateState.dist
            );

            if (isBetter)
            {
                bestStates.Add(candidateState);
            }
        }

        public (int dr, int dx) GetDir(Dir dir)
        {
            return dir switch
            {
                Dir.Up => (-1, 0),
                Dir.Down => (1, 0),
                Dir.Left => (0, -1),
                Dir.Right => (0, 1),
                _ => throw new Exception("Unknown dir")
            };
        }
        public enum Dir
        {
            Up,
            Down,
            Left,
            Right
        }
        public record Pos(int row, int col);
        public record State(int row, int col, int dist, Dir dir, int straightDist, State? prev = null);
    }
}
