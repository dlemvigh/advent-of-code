using AdventOfCode.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode.Y2022
{
    [ProblemName("Rucksack Reorganization")]
    public class Day3
    {
        public int Part1(string input)
        {
            var duplicates = input.Split("\n").Select(FindDuplicates);
            return duplicates.Select(GetPriority).Sum();
        }
        public int Part2(string input)
        {
            var chunks = input.Split("\n").Chunk(3);
            var badges = chunks.Select(chunk =>
            {
                return FindDuplicates(FindDuplicates(chunk[0], chunk[1]), chunk[2]);
            });
            return badges.Select(GetPriority).Sum();
        }

        public string FindDuplicates(string input)
        {
            var leftHalf = input.Substring(0, input.Length / 2);
            var rightHalf = input.Substring(input.Length / 2);

            return FindDuplicates(leftHalf, rightHalf);
        }
        public string FindDuplicates(string leftHalf, string rightHalf)
        {
            var duplicates = leftHalf.Where(x => rightHalf.Contains(x)).Distinct();
            return string.Join("", duplicates);
        }

        public int GetPriority(string input)
        {
            if (input.Length != 1)
            {
                throw new ArgumentException("Expected input to have length == 1", nameof(input));
            }
            char c = input[0];
            
            if ('a' <= c && c <= 'z')
            {
                return c - 'a' + 1;
            }
            if ('A' <= c && c <= 'Z')
            {
                return c -'A' + 1 + 26;
            }
            throw new ArgumentException("Expected input to be [a-z] or [A-Z]", nameof(input));
        }
    }
}
