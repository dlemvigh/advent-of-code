using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day13
    {
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var hashed = parsed.Select(HashImage);
            var reflections = hashed.Select(GetReflectionId);
            return reflections.Sum();
        }

        public int Part2(string input)
        {
            var parsed = ParseInput(input);
            throw new NotImplementedException();
        }

        public int GetReflectionId(HashedImage image)
        {
            var row = GetReflection(image.rows);
            var col = GetReflection(image.columns);

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

        public int GetReflection(IEnumerable<long> values)
        {
            for (var i = 1; i < values.Count(); i++)
            {
                if (IsReflectionAt(values, i))
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

        public record Image(string[] rows);
        public record HashedImage(IEnumerable<long> rows, IEnumerable<long> columns);
    }
}
