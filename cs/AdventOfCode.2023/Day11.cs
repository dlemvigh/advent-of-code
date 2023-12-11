using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day11
    {
        public int Part1(string input)
        {
            var universe = ParseInput(input);

            // Expand galaxy
            var expandedUniverse = ExpandUniverse(universe);

            // Find galaxies
            var galaxies = FindGalaxies(expandedUniverse);

            var distances = FindDistances(galaxies);

            return distances.Sum();
        }

        public IEnumerable<int> FindDistances(IEnumerable<Galaxy> galaxies)
        {
            var galaxyList = galaxies.ToList();
            for (int i = 0; i < galaxyList.Count; i++)
            {
                for (int j = i + 1; j < galaxyList.Count; j++)
                {
                    yield return FindDistance(galaxyList[i], galaxyList[j]);
                }
            }
        }

        public int FindDistance(Galaxy a, Galaxy b)
        {
            return Math.Abs(a.row - b.row) + Math.Abs(a.col - b.col);
        }

        private IEnumerable<Galaxy> FindGalaxies(string[] expandedUniverse)
        {
            var galaxies = new List<Galaxy>();
            for (var row = 0; row < expandedUniverse.Length; row++)
            {
                for (var col = 0; col < expandedUniverse[row].Length; col++)
                {
                    if (expandedUniverse[row][col] == '#')
                    {
                        var galaxy = new Galaxy(row, col);
                        galaxies.Add(galaxy);
                    }
                }
            }
            return galaxies;
        }

        public string[] ExpandUniverse(string[] universe)
        {
            var emptyColumns = FindEmptyColumns(universe);
            var emptyRows = FindEmptyRows(universe);

            universe = ExpandColumns(universe, emptyColumns);
            universe = ExpandRows(universe, emptyRows);

            return universe;
        }

        public IEnumerable<int> FindEmptyColumns(string[] universe)
        {
            return Enumerable.Range(0, universe[0].Length)
                .Where(col => universe.All(row => row[col] == '.'));
        }

        public IEnumerable<int> FindEmptyRows(string[] universe)
        {
            return universe
                .Select((row, index) => (row, index))
                .Where(x => x.row.All(c => c == '.'))
                .Select(x => x.index);
        }

        public string[] ExpandColumns(string[] universe, IEnumerable<int> emptyColumns)
        {
            var expanded = universe.Select(row =>
            {
                var newRow = new StringBuilder(row);
                foreach (var emptyColumn in emptyColumns.OrderByDescending(x => x))
                {
                    newRow.Insert(emptyColumn, '.');
                }
                return newRow.ToString();
            });

            return expanded.ToArray();
        }

        public string[] ExpandRows(string[] universe, IEnumerable<int> emptyRows)
        {
            var newUniverse = new List<string>(universe);
            foreach (var emptyRow in emptyRows.OrderByDescending(x => x))
            {
                newUniverse.Insert(emptyRow, new string('.', universe[0].Length));
            }
            return newUniverse.ToArray();
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

        public record Galaxy(int row, int col);
    }
}
