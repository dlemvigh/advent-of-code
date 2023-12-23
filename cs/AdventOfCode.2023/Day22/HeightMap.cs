using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day22
{
    public interface IHeightMap
    {
        int this[int x, int y] { get; set; }

        int GetMaxHeight(Brick brick);
        void SetHeight(Brick brick);
    }

    public class HeightMap : IHeightMap
    {
        private readonly Dictionary<(int x, int y), int> map = new();

        public int this[int x, int y]
        {
            get => map.TryGetValue((x, y), out var value) ? value : 0;
            set => map[(x, y)] = value;
        }

        public int GetMaxHeight(Brick brick)
        {
            var maxHeight = 0;
            for (var x = brick.X.Start.Value; x <= brick.X.End.Value; x++)
            {
                for (var y = brick.Y.Start.Value; y <= brick.Y.End.Value; y++)
                {
                    maxHeight = Math.Max(maxHeight, this[x, y]);
                }
            }

            return maxHeight;
        }

        public void SetHeight(Brick brick)
        {
            for (var x = brick.X.Start.Value; x <= brick.X.End.Value; x++)
            {
                for (var y = brick.Y.Start.Value; y <= brick.Y.End.Value; y++)
                {
                    this[x, y] = brick.Z.End.Value;
                }
            }
        }
        
    }
}
