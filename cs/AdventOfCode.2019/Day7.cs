using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Shared;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019
{
    [ProblemName("Amplification Circuit")]
    public class Day7
    {
        public int Part1(string program, int[] settings, int input)
        {
            throw new NotImplementedException();
        }

        public int Part2(string input, int target)
        {
            throw new NotImplementedException();
        }

        public int RunAmpSetting(string program, int[] settings, int input)
        {
            var amps = settings.Select(setting => new Computer(program)).ToArray();

            for (var i = 0; i < amps.Length; i++)
            {
                amps[i].Inputs.Enqueue(settings[i]);
                amps[i].Inputs.Enqueue(input);
                amps[i].RunTillHaltOrOutput();
                input = amps[i].Outputs.Dequeue();
            }

            return input;
        }

        public int RunAmpSettingLoop(string program, int[] settings, int input)
        {
            var amps = settings.Select(setting => new Computer(program)).ToArray();

            // load settings 
            for (var i = 0; i < amps.Length; i++)
            {
                amps[i].Inputs.Enqueue(settings[i]);
            }

            var it = 0;
            var running = true;
            while(running) {
                var amp = amps[it % amps.Length];
                amp.Inputs.Enqueue(input);
                amp.RunTillHaltOrOutput();
                if (amp.State.IsHalted) {
                    running = false;
                    return input;
                }
                input = amp.Outputs.Dequeue();
                it++;
            }


            return input;
        }

        public (int max, int[] settings) FindMaxAmpSetting(string program, int[] settings, int input)
        {
            var permutations = GetPermutations(settings);
            return permutations.Select(permutation => {
                var perm = permutation.ToArray();
                var value = RunAmpSetting(program, perm, input);
                return (value, perm);
            }).MaxBy(x => x.value);
        }

        public (int max, int[] settings) FindMaxAmpSettingLoop(string program, int[] settings, int input)
        {
            var permutations = GetPermutations(settings);
            return permutations.Select(permutation => {
                var perm = permutation.ToArray();
                var value = RunAmpSettingLoop(program, perm, input);
                return (value, perm);
            }).MaxBy(x => x.value);
        }

        public IEnumerable<IEnumerable<int>> GetPermutations(int[] list)
        {
            int count = list.Length;
            if (count <= 1)
            {
                yield return list;
            }
            else
            {
                for (int i = 0; i < count; i++)
                {
                    int[] sublist = new int[count - 1];
                    Array.Copy(list, 0, sublist, 0, i);
                    Array.Copy(list, i + 1, sublist, i, count - i - 1);
                    foreach (var permutation in GetPermutations(sublist))
                    {
                        yield return new[] { list[i] }.Concat(permutation);
                    }
                }
            }
        }
    }
}
