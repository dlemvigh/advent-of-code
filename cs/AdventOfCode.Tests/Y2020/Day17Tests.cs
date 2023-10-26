using AdventOfCode.Y2020;

namespace AdventOfCode.Tests.Y2020;

public class Day17Tests {
    Day17 sut = new Day17();

    [Theory]
    [InlineData(new [] { 1, 1, 1 }, 1)]
    [InlineData(new [] { 2 }, 2)]
    [InlineData(new [] { 2, 3 }, 6)]
    [InlineData(new [] { 2, 3, 5 }, 30)]
    [InlineData(new [] { 2, 3, 5, 7 }, 210)]
    public void Cube_GetSize(int[] dimensions, int expected) {
        Assert.Equal(expected, Day17.Cube.GetSize(dimensions));
    }

    [Theory]
    [InlineData(new [] { 1 }, new  [] { 0 }, 0)]
    [InlineData(new [] { 1 }, new  [] { 1 }, -1)]
    [InlineData(new [] { 1 }, new  [] { -1 }, -1)]
    [InlineData(new [] { 1, 1 }, new  int[] { }, 0)]
    [InlineData(new [] { 1, 1 }, new  int[] { 0 }, 0)]
    [InlineData(new [] { 1, 1 }, new  int[] { 1 }, -1)]
    [InlineData(new [] { 1, 1 }, new  int[] { -1 }, -1)]
    [InlineData(new [] { 1, 1 }, new  int[] { 0, 0 }, 0)]
    [InlineData(new [] { 1, 1 }, new  int[] { 0, 1 }, -1)]
    [InlineData(new [] { 1, 1 }, new  int[] { 0, -1 }, -1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 0, 0 }, 0)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {1, 0, 0 }, 1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 1, 0 }, 2)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 0, 1 }, 6)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {1, 1, 1 }, 9)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {2, 0, 0 }, -1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 3, 0 }, -1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 0, 5 }, -1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {2, 3, 5 }, -1)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 2, 0 }, 4)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {0, 0, 2 }, 12)]
    [InlineData(new [] { 2, 3, 5 }, new  [] {2, 2, 2 }, -1)]
    public void Cube_GetIndex(int[] dimensions, int[] vector, int expected) {
        var cube = new Day17.Cube(dimensions);
        var index = cube.GetIndex(vector);
        Assert.Equal(expected, index);
    }

    [Theory]
    [InlineData(
            new [] { 0, 0 },
            // expected
            new [] { -1, -1 },
            new [] { -1, 0 },
            new [] { -1, 1 },
            new [] { 0, -1 },
            new [] { 0, 0 },
            new [] { 0, 1 },
            new [] { 1, -1 },
            new [] { 1, 0 },
            new [] { 1, 1 }
    )]
    [InlineData(
            new [] { 5, 5 },
            // expected
            new [] { 4, 4 },
            new [] { 4, 5 },
            new [] { 4, 6 },
            new [] { 5, 4 },
            new [] { 5, 5 },
            new [] { 5, 6 },
            new [] { 6, 4 },
            new [] { 6, 5 },
            new [] { 6, 6 }
    )]
    [InlineData(
            new [] { 0, 0, 0 },
            // expected
            new [] { -1, -1, -1 },
            new [] { -1, -1, 0 },
            new [] { -1, -1, 1 },
            new [] { -1, 0, -1 },
            new [] { -1, 0, 0 },
            new [] { -1, 0, 1 },
            new [] { -1, 1, -1 },
            new [] { -1, 1, 0 },
            new [] { -1, 1, 1 },
            new [] { 0, -1, -1 },
            new [] { 0, -1, 0 },
            new [] { 0, -1, 1 },
            new [] { 0, 0, -1 },
            new [] { 0, 0, 0 },
            new [] { 0, 0, 1 },
            new [] { 0, 1, -1 },
            new [] { 0, 1, 0 },
            new [] { 0, 1, 1 },
            new [] { 1, -1, -1 },
            new [] { 1, -1, 0 },
            new [] { 1, -1, 1 },
            new [] { 1, 0, -1 },
            new [] { 1, 0, 0 },
            new [] { 1, 0, 1 },
            new [] { 1, 1, -1 },
            new [] { 1, 1, 0 },
            new [] { 1, 1, 1 }
    )]
    public void Cube_GetNear(int[] vector, params int[][] expected) {
        var near = Day17.Cube.GetNear(vector);
        Assert.Equal(expected, near);
    }

    [Theory]
    [InlineData(
        new [] { 1, 1, 1},
        new [] { 0, 0, 0 },
        false
    )]
    // dead stays dead
    [InlineData(
        new [] { 2, 2},
        new [] { 0, 0 },
        false
    )]
    // (2x2)
    // .#
    // ##
    [InlineData(
        new [] { 2, 2},
        new [] { 0, 0 },
        true,
        new [] { 0, 1},
        new [] { 1, 0},
        new [] { 1, 1}
    )]
    [InlineData(
        new [] { 2, 2},
        new [] { 0, 1 },
        true,
        new [] { 0, 1},
        new [] { 1, 0},
        new [] { 1, 1}
    )]
    [InlineData(
        new [] { 2, 2},
        new [] { 1, 0 },
        true,
        new [] { 0, 1},
        new [] { 1, 0},
        new [] { 1, 1}
    )]
    [InlineData(
        new [] { 2, 2},
        new [] { 1, 1 },
        true,
        new [] { 0, 1},
        new [] { 1, 0},
        new [] { 1, 1}
    )]
    // (3x1x1)
    // ###
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 0, 0, 0},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 1, 0, 0},
        true,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 2, 0, 0},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 0, 1, 0},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 0, 0, 1},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 0, -1, 0},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 0, 0, -1},
        false,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 1, 1, 0},
        true,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 1, 0, 1},
        true,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 1, -1, 0},
        true,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    [InlineData(
        new [] { 3, 1, 1},
        new [] { 1, 0, -1},
        true,
        new [] { 0, 0, 0},
        new [] { 1, 0, 0},
        new [] { 2, 0, 0}
    )]
    public void Cube_GetNext(int[] dimensions, int[] vector, bool expected, params int[][] active) {
        // arrange
        var cube = new Day17.Cube(dimensions);
        foreach (var a in active) {
            cube[a] = true;
        }

        // act
        var actual = cube.GetNext(vector);

        // assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 0, 0, 0 }, false)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 1, 0, 0 }, true)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 2, 0, 0 }, false)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 0, 1, 0 }, false)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 1, 1, 0 }, false)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 2, 1, 0 }, true)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 0, 2, 0 }, true)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 1, 2, 0 }, true)]
    [FileTestData("Y2020/Day17/sample.in", new [] { 3, 3, 1 }, new [] { 2, 2, 0 }, true)]
    public void Cube_ParseInput(string input, int [] dimensions, int[] vector, bool expected) {
        var cube = Day17.Cube.ParseInput(input, dimensions);
        Assert.Equal(expected, cube[vector]);
    }

    [Theory]
    [InlineData(
        new [] { 1 },
        new [] { 0 }
    )]
    [InlineData(
        new [] { 1, 1 },
        new [] { 0, 0 }
    )]
    [InlineData(
        new [] { 1, 1, 1 },
        new [] { 0, 0, 0 }
    )]
    [InlineData(
        new [] { 3 },
        new [] { 0 },
        new [] { 1 },
        new [] { 2 }
    )]
    [InlineData(
        new [] { 2, 2 },
        new [] { 0, 0 },
        new [] { 0, 1 },
        new [] { 1, 0 },
        new [] { 1, 1 }
    )]
    public void Cube_GetAllVectors(int[] dimensions, params int[][] expected) {
        var cube = new Day17.Cube(dimensions);
        var vectors = cube.GetAllVectors();
        Assert.Equal(expected, vectors);
    }

    [Theory]
    [FileTestData("Y2020/Day17/sample.in", 112)]
    [FileTestData("Y2020/Day17/input.in", 230)]
    public void Part1(string input, int expected) {
        Assert.Equal(expected, sut.Part1(input));
    }

    [Theory]
    [FileTestData("Y2020/Day17/sample.in", 848)]
    [FileTestData("Y2020/Day17/input.in", 1600)]
    public void Part2(string input, int expected) {
        Assert.Equal(expected, sut.Part2(input));
    }

}