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
            yield return new object[] { "1,1,2,3", Op.ADD, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg (3, Mode.POS) };
            yield return new object[] { "2,1,2,3", Op.MUL, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg (3, Mode.POS) };
            yield return new object[] { "3,4", Op.IN, null, new Arg(4, Mode.POS) };
            yield return new object[] { "4,5", Op.OUT, new []{ (5, Mode.POS) } };
            yield return new object[] { "5,1,2", Op.JUMP_TRUE, new []{ (1, Mode.POS), (2, Mode.POS) } };
            yield return new object[] { "6,1,2", Op.JUMP_FALSE, new []{ (1, Mode.POS), (2, Mode.POS) } };
            yield return new object[] { "7,1,2,3", Op.LESS, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg (3, Mode.POS) };
            yield return new object[] { "8,1,2,3", Op.EQUAL, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg (3, Mode.POS) };
            yield return new object[] { "9,9", Op.ADJ_REL_BASE, new []{ (9, Mode.POS) }};
            yield return new object[] { "99", Op.HALT };
        }
    }
    public static IEnumerable<object[]> ParseNextInstruction_TestData_ParameterModes
    {
        get
        {
            yield return new object[] { "101,1,2,3", Op.ADD, new []{ (1, Mode.IM), (2, Mode.POS) }, new Arg(3, Mode.POS) };
            yield return new object[] { "1001,1,2,3", Op.ADD, new []{ (1, Mode.POS), (2, Mode.IM) }, new Arg(3, Mode.POS) };
            yield return new object[] { "10001,1,2,3", Op.ADD, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg(3, Mode.IM) };
            yield return new object[] { "11101,1,2,3", Op.ADD, new []{ (1, Mode.IM), (2, Mode.IM) }, new Arg(3, Mode.IM) };
            yield return new object[] { "201,1,2,3", Op.ADD, new []{ (1, Mode.REL), (2, Mode.POS) }, new Arg(3, Mode.POS) };
            yield return new object[] { "2001,1,2,3", Op.ADD, new []{ (1, Mode.POS), (2, Mode.REL) }, new Arg(3, Mode.POS) };
            yield return new object[] { "20001,1,2,3", Op.ADD, new []{ (1, Mode.POS), (2, Mode.POS) }, new Arg(3, Mode.REL) };
            yield return new object[] { "22201,1,2,3", Op.ADD, new []{ (1, Mode.REL), (2, Mode.REL) }, new Arg(3, Mode.REL) };
        }
    }

    [Theory]
    [MemberData(nameof(ParseNextInstruction_TestData_Operations))]
    [MemberData(nameof(ParseNextInstruction_TestData_ParameterModes))]
    public void ParseNextInstruction(string program, Op op, (int, Mode)[]? inputs = null, Arg? output = null) 
    {
        inputs ??= new (int, Mode)[]{};

        // arrange 
        var memory = new Memory(program);
        var state = new State();
        var parser = new Parser(memory, state);

        // act
        var actual = parser.ParseNextInstruction();

        // assert
        Assert.Equal(op, actual.op);
        Assert.Equal(inputs, actual.inputs.Select(arg => (arg.adr, arg.mode)));
        Assert.Equal(output, actual.output);
    }
}

