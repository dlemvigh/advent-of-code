using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode2023.Day22
{
    [ProblemName("Sand Slabs")]
    public class Day22
    {
        private readonly IInputParser parser;
        private readonly IHeightMap heightMap;
        private readonly IZCache zCache;

        public Day22(IInputParser? parser = null, IHeightMap? heightMap = null, IZCache? zCache = null)
        {
            this.parser = parser ?? new InputParser();
            this.heightMap = heightMap ?? new HeightMap();
            this.zCache = zCache ?? new ZCache();
        }

        public int Part1(string input)
        {
            var bricks = ParseInput(input);
            var droppedBricked = DropBricks(bricks);
            var removeable = droppedBricked.Where(zCache.CanBeRemoved);
            var count = removeable.Count();
            return count;
        }
        public int Part2(string input)
        {
            var bricks = ParseInput(input);
            var droppedBricked = DropBricks(bricks);
            var unremoveable = droppedBricked.Where(brick => !zCache.CanBeRemoved(brick));
            var above = unremoveable.Select(x => zCache.GetFallingCascade(x));
            var sum = above.Sum(x => x.Count - 1);
            return sum;
        }

        private IEnumerable<Brick> DropBricks(IEnumerable<Brick> bricks)
        {
            var droppedBricks = new List<Brick>();

            foreach (var brick in bricks.OrderBy(brick => brick.Z.Start.Value))
            {
                var maxHeight = heightMap.GetMaxHeight(brick);
                var droppedBrick = GetDroppedBrick(brick, maxHeight + 1);
                heightMap.SetHeight(droppedBrick);
                droppedBricks.Add(droppedBrick);
                zCache.Add(droppedBrick);
            }

            return droppedBricks;
        }

        public Brick GetDroppedBrick(Brick brick, int maxHeight)
        {
            var droppedBrick = brick with { Z = maxHeight..(maxHeight + (brick.Z.End.Value - brick.Z.Start.Value)) };
            return droppedBrick;
        }

        public IEnumerable<Brick> ParseInput(string input)
        {
            return input.Split("\n").Select(parser.ParseBrick);
        }
    }
}
