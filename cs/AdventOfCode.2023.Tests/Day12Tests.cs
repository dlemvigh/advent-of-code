using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2023;

namespace AdventOfCode2023.Tests
{
    public class Day12Tests
    {

        [Theory]
        [InlineData("#.#.### 1,1,3", "#.#.###", 1, 1, 3)]
        [InlineData("?###???????? 3,2,1", "?###????????", 3, 2, 1)]
        public void ParseLine(string input, string line, params int[] groups)
        {
            // arrange 
            var sut = new Day12();

            // act
            var actual = sut.ParseLine(input);

            // assert
            Assert.Equal(line, actual.line);
            Assert.Equal(groups, actual.groups);
        }

        [Theory]
        [InlineData(".# 1", ".#?.#?.#?.#?.#", 1, 1, 1, 1, 1)]
        [InlineData("???.### 1,1,3", "???.###????.###????.###????.###????.###", 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3)]
        public void ParseLine2(string input, string line, params int[] groups)
        {
            // arrange 
            var sut = new Day12();

            // act
            var actual = sut.ParseLine2(input);

            // assert
            Assert.Equal(line, actual.line);
            Assert.Equal(groups, actual.groups);
        }

        [Theory]
        [InlineData("#", 1, "")]
        [InlineData("?", 1, "")]
        [InlineData(".", 1, null)]
        [InlineData("#.#", 1, "#")]
        [InlineData("?.#", 1, "#")]
        [InlineData("..#", 1, null)]
        [InlineData("#.?", 1, "?")]
        [InlineData("?.?", 1, "?")]
        [InlineData("..?", 1, null)]
        [InlineData("#..", 1, "")]
        [InlineData("?..", 1, "")]
        [InlineData("...", 1, null)]
        [InlineData("##", 2, "")]
        [InlineData("#?", 2, "")]
        [InlineData("#.", 2, null)]
        [InlineData("?#", 2, "")]
        [InlineData("??", 2, "")]
        [InlineData("?.", 2, null)]
        [InlineData(".#", 2, null)]
        [InlineData(".?", 2, null)]
        [InlineData("..", 2, null)]
        public void TryTake(string input, int count, string? expected)
        {
            // arrange 
            var sut = new Day12.Worker();

            // act
            var actual = sut.TryTake(count, input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("#", "#")]
        [InlineData("?", "?")]
        [InlineData(".#", "#")]
        [InlineData(".?", "?")]
        [InlineData("...#", "#")]
        [InlineData("...?", "?")]
        [InlineData("#..", "#..")]
        [InlineData("?..", "?..")]
        [InlineData("...", "")]
        public void TrimStart(string input, string expected)
        {
            // arrange 
            var sut = new Day12.Worker();

            // act
            var actual = sut.TrimStart(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("#", true, 1)]
        [InlineData("?", true, 1)]
        [InlineData(".", false, 1)]
        [InlineData("#.#", false, 1)]
        [InlineData("#.#", true, 1, 1)]
        [InlineData("#.?", true, 1, 1)]
        [InlineData("?.#", true, 1, 1)]
        [InlineData("?.?", true, 1, 1)]
        [InlineData("##.#", false, 1, 1)]
        [InlineData("##.#", true, 2, 1)]        
        public void CanTakeAll(string line, bool expected, params int[] groups)
        {
            // arrange 
            var sut = new Day12.Worker();

            // act
            var actual = sut.CanTakeAll(groups, line);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("#.#.### 1,1,3", 1)]
        [InlineData("???.### 1,1,3", 1)]
        [InlineData(".??..??...?##. 1,1,3", 4)]
        [InlineData("?#?#?#?#?#?#?#? 1,3,1,6", 1)]
        [InlineData("????.#...#... 4,1,1", 1)]
        [InlineData("????.######..#####. 1,6,5", 4)]
        [InlineData("?###???????? 3,2,1", 10)]
        public void CountArrangements(string line, int expected)
        {
            // arrange 
            var sut = new Day12.Worker();
            var row = new Day12().ParseLine(line);

            // act
            var actual = sut.CountArrangements(row);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("???.### 1,1,3", 1)]
        [InlineData(".??..??...?##. 1,1,3", 16384)]
        [InlineData("?#?#?#?#?#?#?#? 1,3,1,6", 1)]
        [InlineData("????.#...#... 4,1,1", 16)]
        [InlineData("????.######..#####. 1,6,5", 2500)]
        [InlineData("?###???????? 3,2,1", 506250)]
        public void CountArrangements2(string line, int expected)
        {
            // arrange 
            var sut = new Day12.Worker();
            var row = new Day12().ParseLine2(line);

            // act
            var actual = sut.CountArrangements(row);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day12/sample0.in", 6)]
        [FileTestData("Day12/sample.in", 21)]
        [FileTestData("Day12/input.in", 8193)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day12();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day12/sample.in", 525152)]
        [FileTestData("Day12/input.in", 45322533163795L)]
        public void Part2(string input, long expected)
        {
            // arrange 
            var sut = new Day12();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
