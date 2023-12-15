using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("Lens Library")]
    public class Day15
    {
        private readonly Dictionary<string, int> cache = new Dictionary<string, int>();
        public int Part1(string input)
        {
            var parsed = ParseInput(input);
            var hashed = parsed.Select(HashStringCached);
            var sum = hashed.Sum();
            return sum;
        }

        public int Part2(string input)
        {
            var boxes = CreateBoxes();
            var instructions = ParseInstructions(input);

            FollowInstructions(boxes, instructions);

            return GetTotalFocusPower(boxes);
        }

        private static List<Box> CreateBoxes()
        {
            return Enumerable.Range(0, 256).Select((_) => new Box(new List<LensFocus>())).ToList();
        }

        public int GetTotalFocusPower(List<Box> boxes)
        {
            var lensPower = boxes.SelectMany((box, boxIndex) =>
            {
                return box.lenses.Select((pair, pairIndex) =>
                {
                    var power = (boxIndex + 1) * (pairIndex + 1) * pair.focus;
                    return power;
                });
            });

            return lensPower.Sum();
        }

        public void FollowInstructions(List<Box> boxes, IEnumerable<Instruction> instructions)
        {
            foreach (var instruction in instructions)
            {
                var hash = HashStringCached(instruction.label);
                var box = boxes[hash];

                if (instruction.op == Op.Assign && instruction.adr.HasValue)
                {
                    var index = box.lenses.FindIndex(x => x.lens == instruction.label);
                    if (index != -1)
                    {
                        box.lenses[index] = new LensFocus(instruction.label, instruction.adr.Value);
                    }
                    else
                    {
                        box.lenses.Add(new LensFocus(instruction.label, instruction.adr.Value));
                    }
                }
                else if (instruction.op == Op.Remove)
                {
                    box.lenses.RemoveAll(l => l.lens == instruction.label);
                }
                else
                {
                    throw new ArgumentException("Unknown instruction", nameof(instruction));
                }
            }
        }

        public int HashStringCached(string input)
        {
            if (cache.TryGetValue(input, out var cached))
            {
                return cached;
            }

            var hash = HashString(input);
            cache[input] = hash;
            return hash;
        }

        public int HashString(string input)
        {

            var hash = 0;
            foreach(var c in input)
            {
                hash += c;
                hash *= 17;
                hash %= 256;
            }

            return hash;
        }

        public string[] ParseInput(string input)
        {
            return input.Split(",");
        }

        public IEnumerable<Instruction> ParseInstructions(string input)
        {
            return input.Split(",").Select(ParseInstruction);
        }

        private static readonly Regex InstructionRegex = new Regex(@"(\w+)([=-])(\d+)?");
        public Instruction ParseInstruction(string input)
        {
            var match = InstructionRegex.Match(input);
            if (!match.Success) throw new Exception($"Failed to parse instruction: {input}");

            var instruction = new Instruction(
                label: match.Groups[1].Value,
                op: (Op)match.Groups[2].Value[0],
                adr: match.Groups[3].Success ? int.Parse(match.Groups[3].Value) : null
            );

            return instruction;
        }

        public record Instruction(string label, Op op, int? adr);

        public enum Op
        {
            Remove = '-',
            Assign = '='
        }

        public record LensFocus(string lens, int focus);

        public record Box(List<LensFocus> lenses);
    }
}
