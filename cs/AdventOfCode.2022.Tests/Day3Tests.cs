using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Y2022;

namespace AdventOfCode.Tests.Y2022
{
    public class Day3Tests
    {
        private readonly Day3 sut = new Day3();

        [Theory]
        [InlineData("vJrwpWtwJgWrhcsFMMfFFhFp", "p")]
        [InlineData("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "L")]
        [InlineData("PmmdzqPrVvPwwTWBwg", "P")]
        [InlineData("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "v")]
        [InlineData("ttgJtRGJQctTZtZT", "t")]
        [InlineData("CrZsJsPPZsGzwwsLwLmpwMDw", "s")]
        public void Part1_FindDuplicates(string input, string expected)
        {
            var actual = this.sut.FindDuplicates(input);

            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("a", 1)]
        [InlineData("b", 2)]
        [InlineData("z", 26)]
        [InlineData("A", 27)]
        [InlineData("B", 28)]
        [InlineData("Z", 52)]
        public void Part1_GetPriority(string input, int expected)
        {
            // arrange
            var sut = new Day3();

            // act
            var actual = sut.GetPriority(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day3/sample.in", 157)]
        [FileTestData("Day3/input.in", 7848)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day3();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day3/sample.in", 70)]
        [FileTestData("Day3/input.in", 2616)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day3();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
