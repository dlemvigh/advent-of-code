using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode.Y2022;
using AdventOfCode2023;
using static AdventOfCode.Y2022.Day20;

namespace AdventOfCode2023.Tests
{
    public class Day20Tests
    {
        [Theory]
        [InlineData(Signal.Low)]
        [InlineData(Signal.High)]
        [InlineData(Signal.Low, "a")]
        [InlineData(Signal.High, "a")]
        [InlineData(Signal.Low, "a", "b", "c")]
        [InlineData(Signal.High, "a", "b", "c")]
        public void BroadcastModule_Process(Signal signal, params string[] outputs)
        {
            // arrange 
            var src = "button";
            var name = "broadcaster";
            var input = new Pulse(src, signal, name);
            var sut = new BoardcastModule(name, outputs);
            var expected = outputs.Select(output => new Pulse(name, signal, output));

            // act
            var actual = sut.Process(input);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> FlipFlopModule_Process_TestData
        {
            get {
                yield return new object[] { "flipflop", Signal.High, false, new string[] { "a" }, Array.Empty<Pulse>() };
                yield return new object[] { "flipflop", Signal.High, false, new string[] { "a", "b" }, Array.Empty<Pulse>() };
                yield return new object[] { "flipflop", Signal.High, true, new string[] { "a" }, Array.Empty<Pulse>() };
                yield return new object[] { "flipflop", Signal.High, true, new string[] { "a", "b" }, Array.Empty<Pulse>() };
                yield return new object[] { "flipflop", Signal.Low, false, new string[] { "a" }, new Pulse[] { new Pulse("flipflop", Signal.High, "a") } };
                yield return new object[] { "flipflop", Signal.Low, false, new string[] { "a", "b" }, new Pulse[] { new Pulse("flipflop", Signal.High, "a"), new Pulse("flipflop", Signal.High, "b") } };
                yield return new object[] { "flipflop", Signal.Low, true, new string[] { "a" }, new Pulse[] { new Pulse("flipflop", Signal.Low, "a") } };
                yield return new object[] { "flipflop", Signal.Low, true, new string[] { "a", "b" }, new Pulse[] { new Pulse("flipflop", Signal.Low, "a"), new Pulse("flipflop", Signal.Low, "b") } };
            }
        }

        [Theory]
        [MemberData(nameof(FlipFlopModule_Process_TestData))]
        public void FlipFlopModule_Process(string name, Signal signal, bool state, string[] outputs, Pulse[] expected)
        {
            // arrange 
            var src = "button";
            var input = new Pulse(src, signal, name);
            var sut = new FlipFlopModule(name, outputs, state);

            // act
            var actual = sut.Process(input);

            // assert
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> ConjuctionModuleModule_Process_TestData
        {
            get
            {
                yield return new object[] { "conjuction", new[] { "in" }, Enumerable.Empty<string>(), new[] { "out" }, new Pulse("in", Signal.Low, "conjuction"), new Pulse[] { new Pulse("conjuction", Signal.High, "out") } };
                yield return new object[] { "conjuction", new[] { "in" }, Enumerable.Empty<string>(), new[] { "out" }, new Pulse("in", Signal.High, "conjuction"), new Pulse[] { new Pulse("conjuction", Signal.Low, "out") } };
                yield return new object[] { "conjuction", Enumerable.Empty<string>(), new[] { "in" }, new[] { "out" }, new Pulse("in", Signal.Low, "conjuction"), new Pulse[] { new Pulse("conjuction", Signal.High, "out") } };
                yield return new object[] { "conjuction", Enumerable.Empty<string>(), new[] { "in" }, new[] { "out" }, new Pulse("in", Signal.High, "conjuction"), new Pulse[] { new Pulse("conjuction", Signal.Low, "out") } };
                // inputs 2 - both initial low
                yield return new object[] { "conjuction", 
                    new[] { "in1", "in2" }, 
                    Enumerable.Empty<string>(), 
                    new[] { "out" }, 
                    new Pulse("in1", Signal.Low, "conjuction"), 
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") } 
                };
                yield return new object[] { "conjuction",
                    new[] { "in1", "in2" },
                    Enumerable.Empty<string>(),
                    new[] { "out" },
                    new Pulse("in2", Signal.Low, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    new[] { "in1", "in2" },
                    Enumerable.Empty<string>(),
                    new[] { "out" },
                    new Pulse("in1", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    new[] { "in1", "in2" },
                    Enumerable.Empty<string>(),
                    new[] { "out" },
                    new Pulse("in2", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                // inputs 2 - both initial high
                yield return new object[] { "conjuction",
                    Enumerable.Empty<string>(),
                    new[] { "in1", "in2" },
                    new[] { "out" },
                    new Pulse("in1", Signal.Low, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    Enumerable.Empty<string>(),
                    new[] { "in1", "in2" },
                    new[] { "out" },
                    new Pulse("in2", Signal.Low, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    Enumerable.Empty<string>(),
                    new[] { "in1", "in2" },
                    new[] { "out" },
                    new Pulse("in1", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.Low, "out") }
                };
                yield return new object[] { "conjuction",
                    Enumerable.Empty<string>(),
                    new[] { "in1", "in2" },
                    new[] { "out" },
                    new Pulse("in2", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.Low, "out") }
                };
                // inputs 2 - in1 low, in2 high
                yield return new object[] { "conjuction",
                    new[] { "in1" },
                    new[] { "in2" },
                    new[] { "out" },
                    new Pulse("in1", Signal.Low, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    new[] { "in1" },
                    new[] { "in2" },
                    new[] { "out" },
                    new Pulse("in2", Signal.Low, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
                yield return new object[] { "conjuction",
                    new[] { "in1" },
                    new[] { "in2" },
                    new[] { "out" },
                    new Pulse("in1", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.Low, "out") }
                };
                yield return new object[] { "conjuction",
                    new[] { "in1" },
                    new[] { "in2" },
                    new[] { "out" },
                    new Pulse("in2", Signal.High, "conjuction"),
                    new Pulse[] { new Pulse("conjuction", Signal.High, "out") }
                };
            }
        }

        [Theory]
        [MemberData(nameof(ConjuctionModuleModule_Process_TestData))]
        public void ConjuctionModuleModule_Process(
            string name, 
            IEnumerable<string> initiallyLow, 
            IEnumerable<string> initiallyHigh, 
            IEnumerable<string> outputs,
            Pulse input,
            Pulse[] expected
        ) {
            // arrange 
            var sut = new ConjuctionModule(name, outputs);
            foreach (var lowInput in initiallyLow)
            {
                sut.AddInput(lowInput, Signal.Low);
            }
            foreach (var highInput in initiallyHigh)
            {
                sut.AddInput(highInput, Signal.High);
            }

            // act
            var actual = sut.Process(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day20/sample1.in", 32000000L)]
        [FileTestData("Day20/sample2.in", 11687500L)]
        [FileTestData("Day20/input.in", 841763884L)]
        public void Part1(string input, int expected)
        {
            // arrange 
            var sut = new Day20();

            // act
            var actual = sut.Part1(input);

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day20/sample.in", 4)]
        [FileTestData("Day20/input.in", 41)]
        public void Part2(string input, int expected)
        {
            // arrange 
            var sut = new Day20();

            // act
            var actual = sut.Part2(input);

            // assert
            Assert.Equal(expected, actual);
        }
    }
}
