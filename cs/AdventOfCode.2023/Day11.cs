using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("Cosmic Expansion")]
    public class Day11
    {
        private Dictionary<(long, long), long> rowCache = new Dictionary<(long, long), long>();
        private Dictionary<(long, long), long> colCache = new Dictionary<(long, long), long>();

        public long Part1(string input)
        { 
            return GetAllGalaxyDistances(input, 1);
        }

        public long Part2(string input)
        {
            return GetAllGalaxyDistances(input, 999999);
        }


        public long GetAllGalaxyDistances(string input, long multipier = 1)
        {
            var universe = ParseInput(input);

            var emptyRows = FindEmptyRows(universe);
            var emptyColumns = FindEmptyColumns(universe);

            // Expand galaxy
            //var expandedUniverse = ExpandUniverse(universe);

            // Find galaxies
            var galaxies = FindGalaxies(universe);

            var distances = FindDistances(galaxies, emptyRows, emptyColumns, multipier).ToList();

            return distances.Sum();
        }

        public IEnumerable<long> FindDistances(IEnumerable<Galaxy> galaxies, IEnumerable<int> emptyRows, IEnumerable<int> emptyCols, long multiplier)
        {
            var galaxyList = galaxies.ToList();
            for (var i = 0; i < galaxyList.Count; i++)
            {
                for (var j = i + 1; j < galaxyList.Count; j++)
                {
                    yield return FindDistance(galaxyList[i], galaxyList[j], emptyRows, emptyCols, multiplier);
                }
            }
        }

        public long FindDistance(Galaxy a, Galaxy b, IEnumerable<int> emptyRows, IEnumerable<int> emptyCols, long multiplier)
        {
            long rowDistance = Math.Abs(a.row - b.row);
            long colDistance = Math.Abs(a.col - b.col);

            var rowEmpty = GetEmpty(a.row, b.row, emptyRows, rowCache);
            var colEmpty = GetEmpty(a.col, b.col, emptyCols, colCache);

            rowDistance += multiplier * rowEmpty;
            colDistance += multiplier * colEmpty;
            var distance = rowDistance + colDistance;

            return distance;
        }

        public long GetEmpty(long a, long b, IEnumerable<int> empty, IDictionary<(long, long), long> cache)
        {
            if (cache.TryGetValue((a, b), out var cached))
            {
                return cached;
            }

            var dist = empty.Where(e => Math.Min(a, b) < e && e < Math.Max(a, b)).Count();
            cache[(a, b)] = dist;
            return dist;
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

        public string[] ParseInput(string input)
        {
            return input.Split("\n");
        }

        public record Galaxy(long row, long col);
    }
}
