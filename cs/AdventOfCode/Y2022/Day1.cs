using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Calorie Counting")]
    public class Day1
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            return FindMaxCalories(parsed);
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            return FindTop3Calories(parsed);

        }

        public int FindMaxCalories(IEnumerable<IEnumerable<int>> input)
        {
            return input.Select(group => group.Sum()).Max();
        }

        public int FindTop3Calories(IEnumerable<IEnumerable<int>> input)
        {
            var calories = input.Select(group => group.Sum());
            return calories.OrderDescending().Take(3).Sum();
        }

        public IEnumerable<IEnumerable<int>> ParseInput(string input)
        {
            return input.Split("\n\n").Select(group => 
                group.Split("\n").Select(line => 
                    int.Parse(line)
                )
            );
        }
    }
}
