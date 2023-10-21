namespace AdventOfCode.Y2020;

public class Day17 {
    public class Cube {
        private readonly bool[] data;
        private readonly int[] dimensions;

        public Cube(params int[] dimensions) {
            var size = GetSize(dimensions);
            this.dimensions = dimensions;
            this.data = new bool[size];
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
            if (vector.Length != dimensions.Length ) throw new ArgumentException();
            for (var d = 0; d < dimensions.Length; d++) {
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
                return index > 0 && this.data[index];
            }
            set {
                var index = GetIndex(vector);
                this.data[index] = value;
            }
        }
    }
}