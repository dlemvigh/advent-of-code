using AdventOfCode.Y2020;

namespace AdventOfCode.Tests.Y2020;

public class Day1Tests {
    Day1 sut = new Day1();

    [Theory]
    [FileTestData("Y2020/Day1/sample.in", 2020, 514579)]
    [FileTestData("Y2020/Day1/input.in", 2020, 956091)]
    public void Part1(string input, int target, int expected) {
        Assert.Equal(expected, sut.Part1(input, target));
    }

    [Theory]
    [FileTestData("Y2020/Day1/sample.in", 2020, 241861950)]
    [FileTestData("Y2020/Day1/input.in", 2020, 79734368)]
    public void Part2(string input, int target, int expected) {
        Assert.Equal(expected, sut.Part2(input, target));
    }

}