using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day10
    {
        public int Part1(string input)
        {
            // Parse input into list of strings
            var lines = ParseInput(input);

            // Find S in input
            var start = FindStart(lines);

            // Follow pipes until you get back to S
            var state = FollowPipes(start, lines);

            if (state != null)
            {
                return state.Steps / 2;
            }

            // Count number of steps
            // Might be dead end

            // state 
            // current position (row, col)
            // current direction (up, down, left, right) (drow, dcol)
            // steps taken
            // initial state
            // current position = S
            // current direction = down
            // steps taken = 0

            throw new NotImplementedException();
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();
        }

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public State FollowPipes((int row, int col) start, string[] lines)
        {
            var dirs = new[] { Direction.Up, Direction.Down, Direction.Left, Direction.Right };
            foreach (var dir in dirs)
            {
                var state = FollowPipes(start, lines, dir);
                if (state != null)
                {
                    return state;
                }
            }
            throw new Exception("Could not find end");
        }

        public State? FollowPipes((int row, int col) start, string[] lines, Direction dir)
        {
            var state = new State(start.row, start.col, dir, 0);
            while (state.Steps == 0 || lines[state.Row][state.Col] != 'S')
            {
                try
                {
                    state = FollowPipe(state, lines);
                } catch (Exception e)
                {
                    return null;
                }
            }
            return state;

        }

        public State FollowPipe(State state, string[] lines)
        {
            var (row, col) = GetNextPosition(state.Row, state.Col, state.Dir);
            var pipe = lines[row][col];
            var steps = state.Steps + 1;

            if (pipe == 'S')
            {
                return new State(row, col, state.Dir, steps);
            }

            var dir = GetNextDirection(pipe, state.Dir);
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

        public record State(int Row, int Col, Direction Dir, int Steps);
    }
}
