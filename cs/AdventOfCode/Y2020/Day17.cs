namespace AdventOfCode.Y2020;

public class Day17 {

    public int Part1(string input) {
        var lines = input.Split("\n");
        var x = lines.First().Length;
        var y = lines.Length;
        var init = Cube.ParseInput(input, new int[] { x, y, 1 });
        var final = init.GetNextGeneration(6);
        return CountActive(final);
    }

    public int Part2(string input) {
        var lines = input.Split("\n");
        var x = lines.First().Length;
        var y = lines.Length;
        var init = Cube.ParseInput(input, new int[] { x, y, 1, 1 });
        var final = init.GetNextGeneration(6);
        return CountActive(final);
    }

    public static int CountActive(Cube cube) {
        return cube.GetAllVectors().Count(vector => cube[vector]);
    }

    public class Cube {
        private readonly bool[] data;
        private readonly int[] dimensions;

        public Cube(params int[] dimensions) {
            var size = GetSize(dimensions);
            this.dimensions = dimensions;
            this.data = new bool[size];
        }
        public static Cube ParseInput(string input, int d) {
            var lines = input.Split("\n");

            var dimensions = Enumerable.Repeat(1, d).ToArray();
            dimensions[1] = lines.Length;
            dimensions[0] = lines[0].Length;
            
            var cube = new Cube(dimensions);

            for (var y = 0; y < lines.Length; y++) {
                for (var x = 0; x < lines[y].Length; x++) {
                    var value = lines[y][x] == '#';
                    cube[x, y] = value;
                }
            }

            return cube;
        }

        public static Cube ParseInput(string input, params int[] dimensions) {
            var cube = new Cube(dimensions);
            var lines = input.Split("\n");

            for (var y = 0; y < lines.Length; y++) {
                for (var x = 0; x < lines[y].Length; x++) {
                    var value = lines[y][x] == '#';
                    cube[x, y] = value;
                }
            }

            return cube;
        }

        public static int GetSize(params int[] dimensions) {
            var size = 1;
            foreach (var d in dimensions) {
                size *= d;
            }
            return size;
        }

        public int GetIndex(params int[] vector) {
            var index = 0;
            var step = 1;
            for (var d = 0; d < vector.Length; d++) {
                if (vector[d] < 0 || vector[d] >= dimensions[d]) return -1;
                
                index += vector[d] * step;
                step *= dimensions[d];
            }
            return index;
        }

        public static IEnumerable<int[]> GetNear(params int[] vector) {

            var near = GetNear(vector.ToList());

            return near.Select(x => x.ToArray());
        }

        public IEnumerable<int[]> GetAllVectors() {
            var vectors = GetAllVectors(this.dimensions);
            return vectors.Select(x => x.ToArray());
        }

        public static IEnumerable<IEnumerable<int>> GetAllVectors(IEnumerable<int> dimensions) {
            if (dimensions.Count() > 0) {
                var dimension = dimensions.First();
                var rest = dimensions.Skip(1);

                for (var d = 0; d < dimension; d++) {
                    if (rest.Count() > 0) {
                        foreach(var nested in GetAllVectors(rest)) {
                            var vector = new List<int>() { d };
                            vector.AddRange(nested);
                            yield return vector;
                        }
                    }
                    if (rest.Count() == 0) {
                        yield return new [] { d };
                    }
                }
            }
        }

        public bool GetNext(params int[] vector) {
            var value = this[vector];
            var near = GetNear(vector);
            var activeNear = near.Count(vector => this[vector]);
            
            if (value) {
                return 3 <= activeNear && activeNear <= 4;
            } else {
                return activeNear == 3;
            }
        }

        public Cube GetNextGeneration() {
            return GetNextGeneration(this);
        }

        public static Cube GetNextGeneration(Cube prev) {
            var nextDimensions = prev.dimensions.Select(x => x + 2).ToArray();
            var next = new Cube(nextDimensions);

            foreach(var vector in next.GetAllVectors()) {
                var prevVector = vector.Select(x => x - 1).ToArray();
                var active = prev.GetNext(prevVector);
                next[vector] = active;
            }

            return next;
        }

        public Cube GetNextGeneration(int count) {
            return GetNextGeneration(this, count);
        }

        public static Cube GetNextGeneration(Cube cube, int count) {
            if (count <= 0) throw new ArgumentException("count must be greater than zero", nameof(count));
            
            for (var it = 0; it < count; it++) {
                cube = GetNextGeneration(cube);
            }

            return cube;
        }

        public static IEnumerable<IEnumerable<int>> GetNear(IEnumerable<int> vector) {
            if (vector.Count() == 0) return Enumerable.Empty<int[]>();
            var value = vector.First();
            var rest = vector.Skip(1);
            var nearRest = GetNear(rest);

            var diffs = Enumerable.Range(-1, 3); 
            var near = diffs.SelectMany<int, IEnumerable<int>>(diff => {
                if (nearRest.Count() == 0) {
                    return new [] { new [] { value + diff } };
                }
                return nearRest.Select(list => {
                    var nearThis = new List<int>() { value + diff };
                    nearThis.AddRange(list);
                    return nearThis;
                });
                
            });

            return near;
        }

        public bool this[params int[] vector] {
            get {
                var index = GetIndex(vector);
                return index == -1 ? false : this.data[index];
            }
            set {
                var index = GetIndex(vector);
                this.data[index] = value;
            }
        }
    }
}