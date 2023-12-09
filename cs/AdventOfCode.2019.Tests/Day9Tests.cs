using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019.Tests
{
    public class Day9Tests
    {
        [Fact]
        public void Quine() {
            // arrange
            var program = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
            var computer = new Computer(program);

            // act
            computer.RunTillHalt();

            // assert
            Assert.Equal(program, string.Join(",", computer.Outputs));
        }

        [Theory]
        [InlineData("1102,34915192,34915192,7,4,7,99,0", 1219070632396864)]
        [InlineData("104,1125899906842624,99", 1125899906842624)]
        public void LargeNumbers(string program, long expected) {
            // arrange
            var computer = new Computer(program);

            // act
            computer.RunTillHalt();

            // assert
            Assert.Equal(expected, computer.Outputs.Dequeue());
        }

        [Theory]
        [FileTestData("Day9/input.in", 1, 3906448201)]
        [FileTestData("Day9/input.in", 2, 59785)]
        public void BOOST(string program, long input, long expected) {
            // arrange
            var computer = new Computer(program);

            // act
            computer.Inputs.Enqueue(input);
            computer.RunTillHalt();

            // assert
            Assert.Equal(expected, computer.Outputs.Dequeue());
        }
    }
}
