using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day7
    {
        public int Part1(string input)
        {
            var hands = ParseInput(input);
            var sorted = SortHands(hands);
            var score = CalcScore(sorted);

            return score;
        }

        public int Part2(string input)
        {
            var hands = ParseInputJackWild(input);
            var sorted = SortHands(hands);
            var score = CalcScore(sorted);

            return score;
        }

        public int CalcScore(IEnumerable<Hand> hands)
        {
            var scores = hands.Select((hand, index) => hand.Bid * (index + 1));
            var score = scores.Sum();
            return score;
        }

        public IEnumerable<Hand> SortHands(IEnumerable<Hand> hands)
        {
            return hands.OrderBy(x => -(int)x.HandType)
                                .ThenBy(x => x.Cards[0])
                                .ThenBy(x => x.Cards[1])
                                .ThenBy(x => x.Cards[2])
                                .ThenBy(x => x.Cards[3])
                                .ThenBy(x => x.Cards[4]);
        }

        public HandType GetHandType(int[] cards)
        {
            var groups = cards.GroupBy(x => x).Select(x => x.Count());

            if (groups.Any(x => x == 5)) return HandType.Five;
            if (groups.Any(x => x == 4)) return HandType.Four;
            if (groups.Any(x => x == 3) && groups.Any(x => x == 2)) return HandType.FullHouse;
            if (groups.Any(x => x == 3)) return HandType.Three;
            if (groups.Where(x => x == 2).Count() == 2) return HandType.TwoPairs;
            if (groups.Any(x => x == 2)) return HandType.OnePair;

            return HandType.HighCard;
        }
        public HandType GetHandTypeJackWild(int[] cards)
        {
            // convert jack to highest occorence card
            var cardsWithoutJacks = cards.Where(x => x != 1);
            var cardsOnlyJacks = cards.Where(x => x == 1);
            var highestOccurenceCard = cardsWithoutJacks.GroupBy(x => x).MaxBy(x => x.Count());

            var mappedJackCards = cardsOnlyJacks.Select(x => highestOccurenceCard?.Key ?? 1);
            var mappedHand = cardsWithoutJacks.Concat(mappedJackCards).ToArray();

            // GetHandType
            return GetHandType(mappedHand);
        }

        public IEnumerable<Hand> ParseInput(string input)
        {
            return input.Split("\n").Select(ParseHand);
        }

        public Hand ParseHand(string line)
        {
            var parts = line.Split(" ");

            var cards = parts[0].Select(ParseCard).ToArray();
            var bid = int.Parse(parts[1]);
            var type = GetHandType(cards);

            return new Hand(cards, bid, type);
        }

        public int ParseCard(char card)
        {
            switch(card)
            {
                case 'A': return 14;
                case 'K': return 13;
                case 'Q': return 12;
                case 'J': return 11;
                case 'T': return 10;
                default: return card - '0';
            }
        }

        public IEnumerable<Hand> ParseInputJackWild(string input)
        {
            return input.Split("\n").Select(ParseHandJackWild);
        }


        public Hand ParseHandJackWild(string line)
        {
            var parts = line.Split(" ");

            var cards = parts[0].Select(ParseCardJackWild).ToArray();
            var bid = int.Parse(parts[1]);
            var type = GetHandTypeJackWild(cards);

            return new Hand(cards, bid, type);
        }

        public int ParseCardJackWild(char card)
        {
            switch (card)
            {
                case 'A': return 14;
                case 'K': return 13;
                case 'Q': return 12;
                case 'J': return 1;
                case 'T': return 10;
                default: return card - '0';
            }
        }

        public record Hand(int[] Cards, int Bid, HandType HandType);

        public enum HandType
        {
            Five = 1,
            Four = 2,
            FullHouse = 3,
            Three = 4,
            TwoPairs = 5,
            OnePair = 6,
            HighCard = 7,
        }
    }
}
