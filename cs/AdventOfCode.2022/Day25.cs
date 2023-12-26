using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Full of Hot Air")]
    public class Day25
    {
        public string Part1(string input)
        {
            var lines = input.Split("\n");
            var values = lines.Select(Snafu2decimal);
            var sum = values.Sum();
            var result = Decimal2snafu(sum);
            return result;
        }

        public int Part2(string input)
        {
            throw new NotImplementedException();
        }

        public long Snafu2decimal(string input)
        {
            var base5 = Snafu2base5(input);
            var result = base5.Aggregate(0L, (acc, x) => acc * 5 + x);
            return result;
        }

        public IEnumerable<int> Snafu2base5(string input)
        {
            return input.Select(x => x switch { '=' => -2, '-' => -1, _ => x - '0' });
        }

        public string Decimal2snafu(long input)
        {
            var base5 = Decimal2base5(input).Reverse().ToList();

            var carry = 0;
            for (var i = base5.Count - 1; i >= 0; i--)
            {
                if (base5[i] > 2)
                {
                    base5[i] -= 5;
                    if (i > 0) 
                        base5[i - 1] += 1;
                    else
                        carry = 1;
                }
            }
            if (carry == 1)
            {
                base5.Insert(0, carry);
            }

            var chars = base5.Select(x => x switch { -2 => '=', -1 => '-', _ => (char)(x + '0') });
            var result = new string(chars.ToArray());

            return result;
        }


        public IEnumerable<int> Decimal2base5(long input)
        {
            if (input == 0)
            {
                yield return 0;
            }

            while (input > 0)
            {
                yield return (int)(input % 5);
                input /= 5;
            }
        }
    }
}
