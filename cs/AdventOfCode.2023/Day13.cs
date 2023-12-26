using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2023
{
    [ProblemName("")]
    public class Day13
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var reflections = parsed.Select(GetReflectionId);
            return reflections.Sum();
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            var reflections = parsed.Select(GetFixedReflectionId).ToList();
            return reflections.Sum();
        }
        public int GetFixedReflectionId(Image image)
        {
            var oldReflections = GetReflections(image);

            foreach(var flipped in GetAllImages(image))
            {
                var newReflections = GetReflections(flipped, oldReflections);
                var flippedId = TryGetNewReflection(oldReflections, newReflections);

                if (flippedId > -1)
                {
                    return flippedId;
                }
            }
            throw new InvalidOperationException("Unable to fix reflection");
        }

        public int TryGetNewReflection((int row, int col) oldReflections, (int row, int col) newReflections)
        {
            if (newReflections.row == -1 && newReflections.col == -1) return -1;

            if (newReflections.row != -1 && oldReflections.row != newReflections.row) return newReflections.row * 100;
            if (newReflections.col != -1 && oldReflections.col != newReflections.col) return newReflections.col;

            return -1;
        }

        public IEnumerable<Image> GetAllImages(Image image)
        {
            for (var row = 0; row < image.rows.Length; row++)
            {
                for (var col = 0; col < image.rows[row].Length; col++)
                {
                    yield return FlipPixel(image, row, col);
                }
            }
        }

        public Image FlipPixel(Image image, int r, int c)
        {
            var rows = image.rows.Select((row, rowIndex) =>
            {
                var chars = row.Select((col, colIndex) =>
                {
                    if (r == rowIndex && c == colIndex)
                        return col == '.' ? '#' : '.';
                    else                         
                        return col;
                });
                return new string(chars.ToArray());
            });
            return new Image(rows.ToArray(), (r, c));
        }

        public (int row, int col) GetReflections(Image image, (int row, int col)? oldReflections = null)
        {
            var hashed = HashImage(image);
            var row = GetReflection(hashed.rows, oldReflections?.row);
            var col = GetReflection(hashed.columns, oldReflections?.col);

            return (row, col);
        }

        public int GetReflectionId(Image image)
        {
            var (row, col) = GetReflections(image);

            if (row == -1) return col;
            if (col == -1) return row * 100;

            return -1;
        }   

        public HashedImage HashImage(Image image)
        {
            var columns = Enumerable.Range(0, image.rows[0].Length).Select(i => new string(image.rows.Select(row => row[i]).ToArray()));
            var rows = image.rows;

            var hashedRows = rows.Select(Hash).ToArray();
            var hashedColumns = columns.Select(Hash).ToArray();

            return new HashedImage(hashedRows, hashedColumns);
        }

        public long Hash(string input)
        {
            var binary = input.Replace('.', '0').Replace('#', '1');
            return Convert.ToInt64(binary, 2);
        }

        public IEnumerable<Image> ParseInput(string input)
        {
            return input.Split("\n\n").Select(ParseImage);
        }

        public Image ParseImage(string input)
        {
            var rows = input.Split("\n");
            return new Image(rows);
        }

        public int GetReflection(IEnumerable<long> values, int? ignore = null)
        {
            for (var i = 1; i < values.Count(); i++)
            {
                var isIgnored = ignore.HasValue && ignore.Value == i;
                var isReflection = IsReflectionAt(values, i);

                if (isReflection && !isIgnored)
                    return i;
            }
            return -1;
        }

        public bool IsReflectionAt(IEnumerable<long> values, int index)
        {
            var array = values.ToArray();
            if (index <= 0) throw new ArgumentOutOfRangeException(nameof(index));
            if (index >= values.Count()) throw new ArgumentOutOfRangeException(nameof(index));

            var left = index - 1;
            var right = index;
            while (left >= 0 && right < values.Count())
            {
                if (array[left] != array[right])
                    return false;

                left--;
                right++;
            }
            return true;
        }

        public record Image(string[] rows, (int row, int col)? flipped = null);
        public record HashedImage(IEnumerable<long> rows, IEnumerable<long> columns);
    }
}
