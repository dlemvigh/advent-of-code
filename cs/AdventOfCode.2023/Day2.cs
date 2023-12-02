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
            return games.Where(game => game.Draws.All(draw => draw.red <= redLimit && draw.green <= greenLimit && draw.blue <= blueLimit));
        }

        public int Part2(string input)
        {
            // Parse line
            var games = ParseInput(input);

            // get min cubes
            var power = games.Select(game =>
            {
                var red = game.Draws.Max(x => x.red);
                var green = game.Draws.Max(x => x.green);
                var blue = game.Draws.Max(x => x.blue);
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
            var game = new Game();
            var lineParts = line.Split(": ");

            game.ID = int.Parse(lineParts[0].Split(" ")[1]);
            var draws = lineParts[1].Split("; ");
            game.Draws = draws.Select(ParseDraw);

            return game;
        }

        public Draw ParseDraw(string line) {
            var pattern = @"(\d+) (red|green|blue)";
            var draw = new Draw();

            var matches = Regex.Matches(line, pattern);
            foreach(Match match in matches) {
                if (match.Groups[2].Value == "red") draw.red = int.Parse(match.Groups[1].Value);
                if (match.Groups[2].Value == "green") draw.green = int.Parse(match.Groups[1].Value);
                if (match.Groups[2].Value == "blue") draw.blue = int.Parse(match.Groups[1].Value);
            }
            
            return draw;
        }


        public record Game {
            public int ID;
            public IEnumerable<Draw> Draws;
        }

        public record Draw {
            public int red;
            public int green;
            public int blue;
        }
    }
}
