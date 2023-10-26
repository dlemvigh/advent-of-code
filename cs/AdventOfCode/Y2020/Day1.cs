namespace AdventOfCode.Y2020;

public class Day1 {

    public int? Part1(string input, int target) {
        var values = this.ParseInput(input);
        var pair = this.FindSum(values, target);

        if (pair.HasValue) {
            return pair.Value.a * pair.Value.b;
        }

        return null;
    }

    public int? Part2(string input, int target) {
        var values = this.ParseInput(input);
        var result = this.FindSum3(values, target);
        if (result.HasValue) {
            return result.Value.a * result.Value.b * result.Value.c;
        }
        return null;
    }

    public IEnumerable<int> ParseInput(string input) {
        return input.Split("\n").Select(int.Parse);
    }

    public (int a, int b)? FindSum(IEnumerable<int> values, int target) {
        foreach (var value in values) {
            var remainder = target - value;
            if (values.Contains(remainder)) {
                return (value, remainder);
            }
        }
        return null;
    }

    public (int a, int b, int c)? FindSum3(IEnumerable<int> values, int target) {
        foreach(var value in values) {
            var remainder = target - value;
            var pair = this.FindSum(values, remainder);
            if (pair.HasValue) {
                return (
                    pair.Value.a,
                    pair.Value.b,
                    value
                );
            }
        }
        return null;
    }
}