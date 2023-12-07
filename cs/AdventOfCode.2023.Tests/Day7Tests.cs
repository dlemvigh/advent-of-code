using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;

namespace AdventOfCode2023.Tests
{
    public class Day7Tests
    {
        [Theory]
        [InlineData('A', 14)]
        [InlineData('K', 13)]
        [InlineData('Q', 12)]
        [InlineData('J', 11)]
        [InlineData('T', 10)]
        [InlineData('9', 9)]
        [InlineData('8', 8)]
        [InlineData('7', 7)]
        [InlineData('6', 6)]
        [InlineData('5', 5)]
        [InlineData('4', 4)]
        [InlineData('3', 3)]
        [InlineData('2', 2)]
        public void ParseCard(char card, int expected)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.ParseCard(card);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("23456 42", new[] { 2, 3, 4, 5, 6 }, 42)]
        [InlineData("TJQKA 0", new[] { 10, 11, 12, 13, 14 }, 0)]
        public void ParseHand(string line, int[] expectedCards, int expectedBid)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.ParseHand(line);

            // assert
            Assert.Equal(expectedCards, actual.Cards);
            Assert.Equal(expectedBid, actual.Bid);
        }

        [Theory]
        [InlineData(Day7.HandType.Five, 9, 9, 9, 9, 9)]
        [InlineData(Day7.HandType.Four, 9, 9, 9, 9, 1)]
        [InlineData(Day7.HandType.Four, 9, 9, 9, 1, 9)]
        [InlineData(Day7.HandType.Four, 9, 9, 1, 9, 9)]
        [InlineData(Day7.HandType.Four, 9, 1, 9, 9, 9)]
        [InlineData(Day7.HandType.Four, 1, 9, 9, 9, 9)]
        [InlineData(Day7.HandType.FullHouse, 1, 1, 1, 2, 2)]
        [InlineData(Day7.HandType.Three, 1, 1, 1, 2, 3)]
        [InlineData(Day7.HandType.TwoPairs, 1, 1, 2, 2, 3)]
        [InlineData(Day7.HandType.TwoPairs, 1, 1, 2, 3, 3)]
        [InlineData(Day7.HandType.TwoPairs, 1, 2, 2, 3, 3)]
        [InlineData(Day7.HandType.OnePair, 1, 1, 2, 3, 4)]
        [InlineData(Day7.HandType.HighCard, 1, 2, 3, 4, 5)]
        public void GetHandType(Day7.HandType expected, params int[] cards)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.GetHandType(cards);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day7/sample.in", 6440)]
        [FileTestData("Day7/input.in", 253866470)] // 253866471 Too high
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day7/sample.in", 5905)]
        [FileTestData("Day7/input.in", 254494947)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day7();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
