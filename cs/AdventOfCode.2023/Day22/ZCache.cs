using AdventOfCode2023.Day22;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2023.Day22
{
    public interface IZCache
    {
        void Add(Brick brick);
        IList<Brick> Get(int z);
        bool CanBeRemoved(Brick brick);
        ISet<Brick> GetFallingCascade(Brick brick, ISet<Brick>? cascade = null);
    }

    public class ZCache : IZCache
    {
        public readonly Dictionary<int, IList<Brick>> cache = new();
        public readonly Dictionary<Brick, IList<Brick>> bricksBelow = new();
        public readonly Dictionary<Brick, IList<Brick>> bricksAbove = new();
        public readonly Dictionary<Brick, ISet<Brick>> bricksAboveRec = new();

        public IList<Brick> Get(int z)
        {
            if (cache.TryGetValue(z, out var value))
            {
                return value;
            }

            return Array.Empty<Brick>();
        }

        public void Add(Brick brick)
        {
            var z = brick.Z.End.Value;

            if (!cache.TryGetValue(z, out var value))
            {
                value = new List<Brick>();
                cache[z] = value;
            }

            value.Add(brick);
            bricksBelow[brick] = new List<Brick>();
            bricksAbove[brick] = new List<Brick>();

            foreach (var below in FindBricksBelow(brick))
            {
                bricksBelow[brick].Add(below);
                bricksAbove[below].Add(brick);
            }
        }

        private IEnumerable<Brick> FindBricksBelow(Brick brick)
        {
            var z = brick.Z.Start.Value - 1;
            if (!cache.TryGetValue(z, out var below))
            {
                return Enumerable.Empty<Brick>();
            }

            return below.Where(other => BricksOverlapXY(brick, other));
        }

        public bool BricksOverlapXY(Brick a, Brick b)
        {
            if (a.X.Start.Value > b.X.End.Value || a.X.End.Value < b.X.Start.Value)
            {
                return false;
            }
            if (a.Y.Start.Value > b.Y.End.Value || a.Y.End.Value < b.Y.Start.Value)
            {
                return false;
            }
            return true;
        }
        

        public bool CanBeRemoved(Brick brick)
        {
            var above = bricksAbove[brick];
            if (above.Count == 0)
            {
                return true;
            }

            return above.All(IsStable);
        }

        public bool IsStable(Brick brick)
        {
            return bricksBelow[brick].Count >= 2;
        }

        public ISet<Brick> GetFallingCascade(Brick brick, ISet<Brick>? cascade = null)
        {
            cascade ??= new HashSet<Brick>() { brick };
            foreach (var above in bricksAbove[brick])
            {
                var below = bricksBelow[above];
                if (below.Any(x => !cascade.Contains(x)))
                {
                    continue;
                }

                cascade.Add(above);
                GetFallingCascade(above, cascade);
            }
            return cascade;
        }
    }
}
