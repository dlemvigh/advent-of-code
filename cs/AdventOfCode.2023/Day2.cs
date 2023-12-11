using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Cube Conundrum")]
    public class Day2
    {
        public int Part1(string input)
        {
            // Parse line
            var games = ParseInput(input);

            // filter valid games
            var filteredGames = FilterGames(games, 12, 13, 14);
            
            // sum game id
            var sum = filteredGames.Sum(x => x.ID);

            return sum;
        }

        public IEnumerable<Game> FilterGames(IEnumerable<Game> games, int redLimit, int greenLimit, int blueLimit)
        {
            return games.Where(game => game.Draws.All(draw => draw.Red <= redLimit && draw.Green <= greenLimit && draw.Blue <= blueLimit));
        }

        public int Part2(string input)
        {
            // Parse line
            var games = ParseInput(input);

            // get min cubes
            var power = games.Select(game =>
            {
                var red = game.Draws.Max(x => x.Red);
                var green = game.Draws.Max(x => x.Green);
                var blue = game.Draws.Max(x => x.Blue);
                return red * green * blue;
            });

            // sum power
            return power.Sum();

        }
        public IEnumerable<Game> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseLine);
        }

        public Game ParseLine(string line) {
            var parts = line.Split(": ");

            var id = int.Parse(parts[0].Split(" ")[1]);
            var draws = parts[1].Split("; ").Select(ParseDraw);

            return new Game { ID = id, Draws = draws };
        }

    public Draw ParseDraw(string line)
    {
        var pattern = @"(\d+) (red|green|blue)";
        var matches = Regex.Matches(line, pattern, RegexOptions.Compiled);

        int red = 0, green = 0, blue = 0;
        foreach (Match match in matches)
        {
            int value = int.Parse(match.Groups[1].Value);
            switch (match.Groups[2].Value)
            {
                case "red": red = value; break;
                case "green": green = value; break;
                case "blue": blue = value; break;
            }
        }

        return new Draw { Red = red, Green = green, Blue = blue };
    }

        public record Game
        {
            public int ID { get; init; }
            public IEnumerable<Draw> Draws { get; init; } = Enumerable.Empty<Draw>();
        }

        public record Draw
        {
            public int Red { get; init; }
            public int Green { get; init; }
            public int Blue { get; init; }
        }
        
    }
}
