using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode.Y2020
{
    public class Day17
    {
        public int Part1(string input)
        {
            var cube = ParseInput(input);
            cube = GetNextGeneration(cube, 6);
            var count = GetActiveCount(cube);
            return count;
        }

        public Cube ParseInput(string input)
        {
            var lines = input.Split('\n');

            var layers = 1;
            var rows = lines.Length;
            var columns = lines.First().Length;

            var cube = new Cube(layers, rows, columns);

            for (int row = 0; row < rows; row++)
            {
                var line = lines[row];
                for (int column = 0; column < line.Length; column++)
                {
                    var active = line[column] == '#';
                    cube[0, row, column] = active;
                }
            }

            return cube;
        }

        public int GetActiveCount(Cube cube)
        {
            var count = 0;

            cube.ForEach((value, index) =>
            {
                if (value)
                {
                    count++;
                }
            });

            return count;
        }

        public IEnumerable<(int layer, int row, int column)> GetNear((int layer, int row, int column) index)
        {
            for (int layer = index.layer - 1; layer <= index.layer + 1; layer++)
            {
                for (int row = index.row - 1; row <= index.row + 1; row++)
                {
                    for (int column = index.column - 1; column <= index.column + 1; column++)
                    {
                        if (column == index.column && row == index.row && layer == index.layer) continue;
                        yield return (layer, row, column);
                    }
                }
            }
        }

        public Cube GetNextGeneration(Cube prev)
        {
            var next = new Cube(prev.layers+ 2, prev.rows + 2, prev.columns + 2);
            next.ForEach((_, index) =>
            {
                next[index.layer, index.row, index.column] = GetNext(index, prev);
            });
            return next;
        }

        public Cube GetNextGeneration(Cube cube, int count)
        {
            if (count <= 0) throw new ArgumentException("Generation count must be greater than zero", nameof(count));

            for (var it = 0; it < count; it++)
            {
                cube = GetNextGeneration(cube);
            }

            return cube;
        }

        public bool GetNext((int layer, int row, int column) index, Cube prev)
        {
            var value = prev[index.layer - 1, index.row - 1, index.column - 1];
            var near = GetNear(index).Count(index => prev[index.layer - 1, index.row - 1, index.column - 1]);
            var active = (value && near == 2) || near == 3;
            return active;
        }

        public class Cube
        {
            public readonly int columns;
            public readonly int rows;
            public readonly int layers;

            private readonly bool[,,] data;

            public Cube(int layers, int rows, int columns)
            {
                if (layers <= 0) throw new ArgumentException("Size must be greater than zero", nameof(layers));
                if (rows <= 0) throw new ArgumentException("Size must be greater than zero", nameof(rows));
                if (columns <= 0) throw new ArgumentException("Size must be greater than zero", nameof(columns));

                this.layers = layers;
                this.rows = rows;
                this.columns = columns;

                data = new bool[layers, rows, columns];
            }

            public override string ToString()
            {
                var layers = Enumerable.Range(0, this.layers).Select(layer =>
                {
                    var rows = Enumerable.Range(0, this.rows).Select(row =>
                    {
                        var cols = Enumerable.Range(0, this.columns).Select(column =>
                        {
                            return this.data[layer, row, column] ? "#" : ".";
                        });
                        return string.Join("", cols);
                    });
                    return string.Join("\n", rows);
                });
                return string.Join("\n\n", layers);
            }

            public int GetIndex(int layer, int row, int column)
            {
                return (((0 * this.layers) + layers) * this.rows + rows) * this.columns + columns;
            }

            public bool this[int layer, int row, int column]
            {
                get {
                    if (layer < 0 || layer >= this.layers) return false;
                    if (row < 0 || row >= this.rows) return false;
                    if (column < 0 || column >= this.columns) return false;

                    return data[layer, row, column];
                }
                set { data[layer, row, column] = value; }
            }

            public void ForEach(Action<bool, (int layer, int row, int column)> action)
            {
                for(int layer = 0; layer < this.layers; layer++)
                {
                    for (int row = 0; row < this.rows; row++)
                    {
                        for (int column = 0; column < this.columns; column++)
                        {
                            var value = data[layer, row, column];
                            var index = (layer, row, column);
                            action(value, index);
                        }
                    }
                }
            }
        }

    }
}
