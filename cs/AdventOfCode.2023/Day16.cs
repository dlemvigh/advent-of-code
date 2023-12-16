using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("The Floor Will Be Lava")]
    public class Day16
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var initBeam = new Beam(0, 0, Dir.Right);
            var beams = FollowBeam(parsed, initBeam);
            var result = GetDistinctPositions(beams);
            return result;
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            var initBeams = GetAllInitBeams(parsed);
            var results = initBeams.Select(initBeam =>
            {
                var beams = FollowBeam(parsed, initBeam);
                var result = GetDistinctPositions(beams);
                return result;
            });
            return results.Max();
        }

        public IEnumerable<Beam> GetAllInitBeams(string[] map)
        {
            // top row, going down
            for (var col = 0; col < map[0].Length; col++)
            {
                yield return new Beam(0, col, Dir.Down);
            }
            // left col, going right
            for (var row = 0; row < map.Length; row++)
            {
                yield return new Beam(row, 0, Dir.Right);
            }
            // right col, going left
            for (var row = 0; row < map.Length; row++)
            {
                yield return new Beam(row, map[row].Length - 1, Dir.Left);
            }
            // bottom row, going up
            for (var col = 0; col < map[0].Length; col++)
            {
                yield return new Beam(map.Length - 1, col, Dir.Up);
            }
        }


        public IEnumerable<Beam> FollowBeam(string[] map, Beam init)
        {
            var visited = new HashSet<Beam>();
            var queue = new Queue<Beam>();
            queue.Enqueue(init);

            while (queue.Any())
            {
                var beam = queue.Dequeue();
                if (visited.Contains(beam)) continue;
                visited.Add(beam);

                var tile = (Tile) map[beam.row][beam.col];
                var nextBeams = StepBeam(tile, beam);
                foreach (var nextBeam in nextBeams)
                {
                    if (IsInBounds(map, nextBeam.row, nextBeam.col)) { 
                        queue.Enqueue(nextBeam);
                    }
                }
            }

            return visited;
        }

        public bool IsInBounds(string[] map, int row, int col)
        {
            return 0 <= row && row < map.Length && 0 <= col && col < map[row].Length;
        }

        public int GetDistinctPositions(IEnumerable<Beam> beams)
        {
            return beams.Select(b => (b.row, b.col)).Distinct().Count();
        }

        public IEnumerable<Beam> StepBeam(Tile tile, Beam beam)
        {
            foreach(var dir in GetNextDir(tile, beam.dir))
            {
                var nextPos = GetNextPos(beam.row, beam.col, dir);
                yield return new Beam(nextPos.row, nextPos.col, dir);
            }
        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public enum Dir
        {
            Up,
            Down,
            Left,
            Right
        }

        public enum Tile
        {
            Empty = '.',
            PrismUpDown = '|',
            PrismLeftRight = '-',
            MirrorSlash = '/',
            MirrorBackslash = '\\',
        }

        public (int row, int col) GetNextPos(int row, int col, Dir dir)
        {
            return dir switch
            {
                Dir.Up => (row - 1, col),
                Dir.Down => (row + 1, col),
                Dir.Left => (row, col - 1),
                Dir.Right => (row, col + 1),
                _ => throw new ArgumentException("Unknown direction", nameof(dir))
            };
        }

        public IEnumerable<Dir> GetNextDir(Tile tile, Dir dir)
        {
            switch (tile, dir)
            {
                case (Tile.Empty, _):
                case (Tile.PrismUpDown, Dir.Up):
                case (Tile.PrismUpDown, Dir.Down):
                case (Tile.PrismLeftRight, Dir.Left):
                case (Tile.PrismLeftRight, Dir.Right):
                    yield return dir;
                    break;
                case (Tile.PrismUpDown, Dir.Left):
                case (Tile.PrismUpDown, Dir.Right):
                    yield return Dir.Up;
                    yield return Dir.Down;
                    break;
                case (Tile.PrismLeftRight, Dir.Up):
                case (Tile.PrismLeftRight, Dir.Down):
                    yield return Dir.Left;
                    yield return Dir.Right;
                    break;
                case (Tile.MirrorSlash, Dir.Right):
                case (Tile.MirrorBackslash, Dir.Left):
                    yield return Dir.Up;
                    break;
                case (Tile.MirrorSlash, Dir.Down):
                case (Tile.MirrorBackslash, Dir.Up):
                    yield return Dir.Left;
                    break;
                case (Tile.MirrorSlash, Dir.Left):
                case (Tile.MirrorBackslash, Dir.Right):
                    yield return Dir.Down;
                    break;
                case (Tile.MirrorSlash, Dir.Up):
                case (Tile.MirrorBackslash, Dir.Down):
                    yield return Dir.Right;
                    break;
                default:
                    throw new ArgumentException("Unkown tile/direction", nameof(tile) + ", " + nameof(dir));
            }
        }

        public record struct Beam(int row, int col, Dir dir);
    }
}
