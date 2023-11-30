using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AdventOfCode.Y2020
{
    public class Day21
    {
        public int Part1(string input)
        {
            var lines = ParseInput(input);

            // get all ingredients
            var allIngredients = lines.SelectMany(line => line.ingredients).Distinct();
            // get all allergens
            var allAllergens = lines.SelectMany(line => line.allergens).Distinct();

            // create non-allergen candidate list (initially all allergens)
            var nonAllergenCandidates = allIngredients;
            // group ingredient lines by allergen
            var grouped = new Dictionary<string, string[]>();
            foreach (var allergen in allAllergens)
            {
                var ingredientLines = lines.Where(x => x.allergens.Contains(allergen)).Select(x => x.ingredients);
                var ingredientIntersection = ingredientLines.Aggregate((prev, next) => prev.Intersect(next).ToArray());
                grouped[allergen] = ingredientIntersection;
                nonAllergenCandidates = nonAllergenCandidates.Except(ingredientIntersection);
            }

            // cound occorunces of non-allergen candidates
            var count = 0;
            foreach (var nonAllergen in  nonAllergenCandidates)
            {
                foreach(var line in lines)
                {
                    if (line.ingredients.Contains(nonAllergen))
                    {
                        count++;
                    }
                }                
            }

            return count;
        }

        public IEnumerable<(string[] ingredients, string[] allergens)> ParseInput(string input)
        {
            return input.Split("\n").Select(this.ParseLine);
        }

        public (string[] ingredients, string[] allergens) ParseLine(string line)
        {
            var pattern = @"^(\w+(?: \w+)*) \(contains (\w+(?:, \w+)*)\)$";
            var match = Regex.Match(line, pattern);

            if (!match.Success)
            {
                throw new ArgumentException("Unable to parse input", nameof(line));
            }            

            var ingredients = match.Groups[1].Value.Split(" ");
            var allergens = match.Groups[2].Value.Split(", ");
            return (ingredients, allergens);
        }
    }
}
