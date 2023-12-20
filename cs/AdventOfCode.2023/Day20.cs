using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdventOfCode.Shared;

namespace AdventOfCode.Y2022
{
    [ProblemName("")]
    public class Day20
    {
        public long Part1(string input)
        {
            var modules = ParseInput(input);
            var pulses = new Queue<Pulse>();

            var highCount = 0L;
            var lowCount = 0L;

            for (var i = 0; i < 1000; i++)
            {
                pulses.Enqueue(new Pulse("button", Signal.Low, "broadcaster"));
                while (pulses.Count > 0)
                {
                    var pulse = pulses.Dequeue();

                    if (pulse.signal == Signal.High)
                    {
                        highCount++;
                    }
                    if (pulse.signal == Signal.Low)
                    {
                        lowCount++;
                    }

                    if (modules.TryGetValue(pulse.dest, out var module))
                    {
                        var newPulses = module.Process(pulse);
                        foreach (var newPulse in newPulses)
                        {
                            pulses.Enqueue(newPulse);
                        }
                    }
                }
            }
            return lowCount * highCount;
        }

        public int Part2(string input)
        {
            var modules = ParseInput(input);
            var pulses = new Queue<Pulse>();

            var rxPulse = false;
            var it = 0;

            while(rxPulse == false)
            {
                pulses.Enqueue(new Pulse("button", Signal.Low, "broadcaster"));
                while (pulses.Count > 0)
                {
                    var pulse = pulses.Dequeue();

                    if (pulse.dest == "rx" && pulse.signal == Signal.Low)
                    {
                        rxPulse = true;
                    }

                    if (modules.TryGetValue(pulse.dest, out var module))
                    {
                        var newPulses = module.Process(pulse);
                        foreach (var newPulse in newPulses)
                        {
                            pulses.Enqueue(newPulse);
                        }
                    }
                }
                 it++;
            }

            return it;

        }
        public static Regex ParseLineRegex = new Regex(@"(?<type>[%&])?(?<name>\w+) -> (?<out>.*)", RegexOptions.Compiled);
        public Dictionary<string, Module> ParseInput(string input)
        {
            var lines = input.Split("\n").Select(line => ParseLineRegex.Match(line));
            if (lines.Any(x => !x.Success))
            {
                throw new Exception("Failed to parse input");
            }

            var modules = new Dictionary<string, Module>();
            var conjuctions = new HashSet<string>();
            foreach (var line in lines)
            {
                var type = line.Groups["type"].Value;
                var name = line.Groups["name"].Value;
                var outputs = line.Groups["out"].Value.Split(", ");
                if (type == "%")
                {
                    modules[name] = new FlipFlopModule(name, outputs);
                }
                else if (type == "&")
                {
                    modules[name] = new ConjuctionModule(name, outputs);
                    conjuctions.Add(name);
                }
                else
                {
                    modules[name] = new BoardcastModule(name, outputs);
                }
            }

            foreach (var module in modules.Values)
            {
                var conjuction = module as ConjuctionModule;
                if (conjuction == null)
                {
                    continue;
                }

                foreach (var inputModule in modules.Values.Where(x => x.Outputs.Contains(conjuction.Name)))
                {
                    conjuction.AddInput(inputModule.Name);
                }
            }

            return modules;
        }

        public abstract class Module {
            public string Name { get; }
            public IEnumerable<string> Outputs { get; }
            public Module(string name, IEnumerable<string> outputs)
            {
                Name = name;
                Outputs = outputs;
            }

            public abstract IEnumerable<Pulse> Process(Pulse pulse);
        }
        public class FlipFlopModule : Module {
            public bool StateOn { get; private set; }
            public FlipFlopModule(string name, IEnumerable<string> outputs, bool stateOn = false) : base(name, outputs)
            {
                StateOn = stateOn;
            }

            public override IEnumerable<Pulse> Process(Pulse pulse)
            {
                if (pulse.signal == Signal.Low)
                {
                    StateOn = !StateOn;
                    var outSignal = StateOn ? Signal.High : Signal.Low;

                    foreach (var output in Outputs)
                    {
                        yield return new Pulse(Name, outSignal, output);
                    }
                }
            }
        }
        public class ConjuctionModule : Module
        {
            public Dictionary<string, Signal> LastInput { get; } = new Dictionary<string, Signal>();
            public ConjuctionModule(string name, IEnumerable<string> outputs)
                : base(name, outputs)
            { }

            public void AddInput(string input, Signal initialSignal = Signal.Low)
            {
                LastInput[input] = initialSignal;
            }

            public override IEnumerable<Pulse> Process(Pulse pulse)
            {
                LastInput[pulse.src] = pulse.signal;
                var allHigh = LastInput.All(x => x.Value == Signal.High);
                var outSignal = allHigh ? Signal.Low : Signal.High;
                foreach (var output in Outputs)
                {
                    yield return new Pulse(Name, outSignal, output);
                }
            }
        }
        public class BoardcastModule : Module
        {
            public BoardcastModule(string name, IEnumerable<string> outputs) : base(name, outputs)
            {
            }

            public override IEnumerable<Pulse> Process(Pulse pulse)
            {
                foreach (var output in Outputs)
                {
                    yield return new Pulse(Name, pulse.signal, output);
                }
            }
        }

        public enum Signal
        {
            Low,
            High
        }
        public record Pulse (string src, Signal signal, string dest);
    }
}
