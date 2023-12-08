using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdventOfCode.Tests;
using AdventOfCode2019.Intcode;

namespace AdventOfCode2019.Tests
{
    public class Day5Tests
    {
        [Theory]
        [InlineData("3,0,4,0,99", 0, 0)]
        [InlineData("3,0,4,0,99", 1, 1)]
        [InlineData("3,0,4,0,99", 99, 99)]
        [InlineData("3,0,4,0,99", -1, -1)]
        [InlineData("3,9,8,9,10,9,4,9,99,-1,8", 7, 0)]
        [InlineData("3,9,8,9,10,9,4,9,99,-1,8", 8, 1)]
        [InlineData("3,9,8,9,10,9,4,9,99,-1,8", 9, 0)]
        [InlineData("3,9,7,9,10,9,4,9,99,-1,8", 7, 1)]
        [InlineData("3,9,7,9,10,9,4,9,99,-1,8", 8, 0)]
        [InlineData("3,3,1108,-1,8,3,4,3,99", 7, 0)]
        [InlineData("3,3,1108,-1,8,3,4,3,99", 8, 1)]
        [InlineData("3,3,1108,-1,8,3,4,3,99", 9, 0)]
        [InlineData("3,3,1107,-1,8,3,4,3,99", 7, 1)]
        [InlineData("3,3,1107,-1,8,3,4,3,99", 8, 0)]
        [InlineData("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", -1, 1)]
        [InlineData("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 0, 0)]
        [InlineData("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 1, 1)]
        [InlineData("3,3,1105,-1,9,1101,0,0,12,4,12,99,1", -1, 1)]
        [InlineData("3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 0, 0)]
        [InlineData("3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 1, 1)]
        [FileTestData("Day5/sample.in", 7, 999)]
        [FileTestData("Day5/sample.in", 8, 1000)]
        [FileTestData("Day5/sample.in", 9, 1001)]
        public void IO(string program, int input, int expected)
        {
            // arrange
            var sut = new Computer(program);
            sut.Inputs.Enqueue(input);

            // act
            sut.RunTillHalt();
            var actual = sut.Outputs.Dequeue();

            // assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [FileTestData("Day5/input.in", 1, 13087969)]
        [FileTestData("Day5/input.in", 5, 14110739)]
        public void Diagnose(string program, int input, int expected)
        {
            // arrange 
            var sut = new Computer(program);
            sut.Inputs.Enqueue(input);

            // act
            sut.RunTillHalt();
            var actual = sut.Outputs.Last();

            // assert
            Assert.True(sut.Outputs.Take(sut.Outputs.Count - 1).All(x => x == 0));
            Assert.Equal(expected, actual);
        }

    }
}
