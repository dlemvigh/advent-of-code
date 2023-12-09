using Xunit;
using AdventOfCode2019.Intcode;
using System;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Tests;

public class ParserTests
{
    public static IEnumerable<object[]> ParseNextInstruction_TestData_Operations
    {
        get
        {
            yield return new object[] { "1,1,2,3", new AddInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg (3L, Mode.POS) ) };
            yield return new object[] { "2,1,2,3", new MultiplyInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg (3L, Mode.POS)) };
            yield return new object[] { "3,4", new InputInstruction(new Arg(4L, Mode.POS)) };
            yield return new object[] { "4,5", new OutputInstruction(new Arg(5L, Mode.POS)) };
            yield return new object[] { "5,1,2", new JumpTrueInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS)) };
            yield return new object[] { "6,1,2", new JumpFalseInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS)) };
            yield return new object[] { "7,1,2,3", new LessThanInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg (3L, Mode.POS)) };
            yield return new object[] { "8,1,2,3", new EqualToInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg (3L, Mode.POS)) };
            yield return new object[] { "9,9", new AdjustRelativeBaseInstruction(new Arg(9L, Mode.POS)) };
            yield return new object[] { "99", new HaltInstruction() };
        }
    }
    public static IEnumerable<object[]> ParseNextInstruction_TestData_ParameterModes
    {
        get
        {
            yield return new object[] { "101,1,2,3", new AddInstruction(new Arg(1L, Mode.IM), new Arg(2L, Mode.POS), new Arg(3L, Mode.POS)) };
            yield return new object[] { "1001,1,2,3", new AddInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.IM), new Arg(3L, Mode.POS)) };
            yield return new object[] { "10001,1,2,3", new AddInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg(3L, Mode.IM)) };
            yield return new object[] { "11101,1,2,3", new AddInstruction(new Arg(1L, Mode.IM), new Arg(2L, Mode.IM), new Arg(3L, Mode.IM)) };
            yield return new object[] { "201,1,2,3", new AddInstruction(new Arg(1L, Mode.REL), new Arg(2L, Mode.POS), new Arg(3L, Mode.POS)) };
            yield return new object[] { "2001,1,2,3", new AddInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.REL), new Arg(3L, Mode.POS)) };
            yield return new object[] { "20001,1,2,3", new AddInstruction(new Arg(1L, Mode.POS), new Arg(2L, Mode.POS), new Arg(3L, Mode.REL)) };
            yield return new object[] { "22201,1,2,3", new AddInstruction(new Arg(1L, Mode.REL), new Arg(2L, Mode.REL), new Arg(3L, Mode.REL)) };
        }
    }

    [Theory]
    [MemberData(nameof(ParseNextInstruction_TestData_Operations))]
    [MemberData(nameof(ParseNextInstruction_TestData_ParameterModes))]
    public void ParseNextInstruction(string program, Instruction expected) 
    {
        // arrange 
        var memory = new Memory(program);
        var state = new State();
        var parser = new Parser(memory, state);

        // act
        var actual = parser.ParseNextInstruction();

        // assert
        Assert.Equal(expected, actual);
    }
}

