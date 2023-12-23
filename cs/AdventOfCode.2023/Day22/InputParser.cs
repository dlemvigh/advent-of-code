using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day22
{
    public interface IInputParser
    {
        Brick ParseBrick(string input);
    }

    public class InputParser : IInputParser
    {
        public Brick ParseBrick(string input)
        {
            var parts = input.Split("~");
            var from = parts[0].Split(",");
            var to = parts[1].Split(",");

            return new Brick(
                GetRange(from[0], to[0]),
                GetRange(from[1], to[1]),
                GetRange(from[2], to[2])
            );
        }

        private static Range GetRange(string from, string to)
        {
            return int.Parse(from)..int.Parse(to);
        }
    }

    public record Brick(Range X, Range Y, Range Z);
}
