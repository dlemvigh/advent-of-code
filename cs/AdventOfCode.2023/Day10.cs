using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("")]
    public class Day10
    {
        public int Part1(string input)
        {
            var lines = ParseInput(input);

            var start = FindStart(lines);

            var result = FollowPipes(start, lines);

            return result.state.steps / 2;
        }

        public int Part2(string input)
        {
            var lines = ParseInput(input);

            var start = FindStart(lines);

            var result = FollowPipes2(start, lines);

            return result;
        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public int FollowPipes2((int row, int col) start, string[] lines)
        {
            // Follow path again
            // look for enclosed tiles, to the "right" of path
            // if tile to the right is enclosed
            // flood fill to find enclosed tiles
            // add to hashset
            // compare hashPath and enclosed to find all tiles
            // return size of enclosed tiles

            var result = FollowPipes(start, lines);
            var hashPath = result.meta.path.ToHashSet();
            var count = FollowPipes2(start, lines, result.meta.dir, hashPath);
            return count;
        }

        public int FollowPipes2((int row, int col) start, string[] lines, Direction dir, HashSet<(int row, int col)> path)
        {
            var state = new State(start.row, start.col, dir, 0);
            var enclosed = new HashSet<(int row, int col)>();

            while (state.steps == 0 || lines[state.row][state.col] != 'S')
            {
                try
                {
                    state = FollowPipe(state, lines);
                    var tile = lines[state.row][state.col];
                    // look to the right
                    var toTheRight = GetPositionsToTheRight(state.row, state.col, state.dir, tile);
                    foreach(var pos in toTheRight)
                    {
                        FloodFill(pos, path, enclosed);
                    }
                }
                catch (Exception)
                {
                    return -1;
                }
            }
            return enclosed.Count;
        }

        /// <summary>
        /// Recursively looks around the tile to find enclosed tiles
        /// </summary>
        /// <param name="pos"></param>
        /// <param name="path"></param>
        /// <param name="enclosed"></param>
        public void FloodFill((int row, int col) pos, HashSet<(int row, int col)> path, HashSet<(int row, int col)> enclosed)
        {
            if (enclosed.Contains(pos) || path.Contains(pos))
            {
                return;
            }
            enclosed.Add(pos);

            // Recursively call FloodFill on the neighboring tiles
            FloodFill((pos.row - 1, pos.col), path, enclosed); // Up
            FloodFill((pos.row + 1, pos.col), path, enclosed); // Down
            FloodFill((pos.row, pos.col - 1), path, enclosed); // Left
            FloodFill((pos.row, pos.col + 1), path, enclosed); // Right
        }


        public (State state, Meta meta) FollowPipes((int row, int col) start, string[] lines)
        {
            var dirs = new[] { 
                Direction.Right,
                Direction.Down,
                Direction.Left,
                Direction.Up // technically 4th check is not needed, a prior check will always have succeeded, if  there is a valid solution
            };
            foreach (var dir in dirs)
            {
                var result = FollowPipes(start, lines, dir);
                if (result.HasValue)
                {
                    return result.Value;
                }
            }
            throw new Exception("Could not find end");
        }

        public (State state , Meta meta)? FollowPipes((int row, int col) start, string[] lines, Direction dir)
        {
            var meta = new Meta(new List<(int, int)>(), dir);
            var state = new State(start.row, start.col, dir, 0);
            while (state.steps == 0 || lines[state.row][state.col] != 'S')
            {
                try
                {
                    meta.path.Add((state.row, state.col));
                    state = FollowPipe(state, lines);
                } catch (Exception)
                {
                    return null;
                }
            }
            return (state, meta);

        }

        public State FollowPipe(State state, string[] lines)
        {
            var (row, col) = GetNextPosition(state.row, state.col, state.dir);
            var pipe = lines[row][col];
            var steps = state.steps + 1;

            if (pipe == 'S')
            {
                return new State(row, col, state.dir, steps);
            }

            var dir = GetNextDirection(pipe, state.dir);
            var next = new State(row, col, dir, steps);
            return next;
        }

        public (int row, int col) FindStart(string[] input)
        {
            for (int row = 0; row < input.Length; row++)
            {
                var line = input[row];
                var col = line.IndexOf('S');
                if (col != -1)
                {
                    return (row, col);
                }
            }

            throw new Exception("Could not find start");
        }

        public enum Direction
        {
            Up,
            Down,
            Left,
            Right
        }

        public enum  Pipe
        {
            LeftRight = '-',
            UpDown = '|',
            UpRight = 'L',
            UpLeft = 'J',
            DownLeft = '7',
            DownRight = 'F',
        }

        public Direction GetNextDirection(Pipe pipe, Direction dir)
        {
            return (pipe, dir) switch
            {
                (Pipe.LeftRight, Direction.Right) => Direction.Right,
                (Pipe.LeftRight, Direction.Left) => Direction.Left,
                (Pipe.UpDown, Direction.Up) => Direction.Up,
                (Pipe.UpDown, Direction.Down) => Direction.Down,
                (Pipe.UpRight, Direction.Up) => Direction.Right,
                (Pipe.UpRight, Direction.Right) => Direction.Up,
                (Pipe.UpLeft, Direction.Up) => Direction.Left,
                (Pipe.UpLeft, Direction.Left) => Direction.Up,
                (Pipe.DownLeft, Direction.Down) => Direction.Left,
                (Pipe.DownLeft, Direction.Left) => Direction.Down,
                (Pipe.DownRight, Direction.Down) => Direction.Right,
                (Pipe.DownRight, Direction.Right) => Direction.Down,
                _ => throw new NotImplementedException()
            };
        }
        public Direction GetNextDirection(char pipe, Direction dir)
        {
            return (pipe, dir) switch
            {
                ('-', Direction.Right) => Direction.Right,
                ('-', Direction.Left) => Direction.Left,
                ('|', Direction.Up) => Direction.Up,
                ('|', Direction.Down) => Direction.Down,
                ('L', Direction.Down) => Direction.Right,
                ('L', Direction.Left) => Direction.Up,
                ('J', Direction.Down) => Direction.Left,
                ('J', Direction.Right) => Direction.Up,
                ('7', Direction.Up) => Direction.Left,
                ('7', Direction.Right) => Direction.Down,
                ('F', Direction.Up) => Direction.Right,
                ('F', Direction.Left) => Direction.Down,
                _ => throw new NotImplementedException()
            };
        }

        public (int row, int col) GetPositionBehind(int row, int col, Direction dir)
        {
            return dir switch
            {
                Direction.Up => (row + 1, col),
                Direction.Down => (row - 1, col),
                Direction.Left => (row, col + 1),
                Direction.Right => (row, col - 1),
                _ => throw new NotImplementedException()
            };
        }
        public IEnumerable<(int row, int col)> GetPositionsToTheRight(int row, int col, Direction dir, char tile)
        {
            switch (tile, dir)
            {
                // straight
                case ('-', _):
                case ('|', _):
                    yield return GetPositionToTheRight(row, col, dir);
                    break;
                // inside/concave corner
                case ('J', Direction.Up):
                case ('7', Direction.Left):
                case ('F', Direction.Down):
                case ('L', Direction.Right):
                    yield return GetPositionToTheRight(row, col, dir);
                    yield return GetPositionBehind(row, col, dir);
                    break;
                // outside/convext corner
                case ('J', _):
                case ('7', _):
                case ('F', _):
                case ('L', _):
                // start
                case ('S', _):
                    break;
                default:
                    throw new ArgumentException($"Unknown tile {tile}", nameof(tile));
            }
        }

        public (int row, int col) GetPositionToTheRight(int row, int col, Direction dir)
        {
            return dir switch
            {
                Direction.Up => GetNextPosition(row, col, Direction.Right),
                Direction.Right => GetNextPosition(row, col, Direction.Down),
                Direction.Down => GetNextPosition(row, col, Direction.Left),
                Direction.Left => GetNextPosition(row, col, Direction.Up),
                _ => throw new NotImplementedException()
            };
        }
        public (int row, int col) GetNextPosition(int row, int col, Direction dir)
        {
            return dir switch
            {
                Direction.Up => (row - 1, col),
                Direction.Down => (row + 1, col),
                Direction.Left => (row, col - 1),
                Direction.Right => (row, col + 1),
                _ => throw new NotImplementedException()
            };
        }

        public record State(int row, int col, Direction dir, int steps);
        public record Meta (List<(int row, int col)> path, Direction dir);
    }
}
