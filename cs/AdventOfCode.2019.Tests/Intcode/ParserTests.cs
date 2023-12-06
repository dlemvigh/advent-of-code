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
            yield return new object[] { "1,1,2,3", Op.ADD, (1, Mode.POS), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "2,1,2,3", Op.MUL, (1, Mode.POS), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "3,4", Op.IN, (4, Mode.POS) };
            yield return new object[] { "4,5", Op.OUT, (5, Mode.POS) };
            yield return new object[] { "5,1,2", Op.JUMP_TRUE, (1, Mode.POS), (2, Mode.POS) };
            yield return new object[] { "6,1,2", Op.JUMP_FALSE, (1, Mode.POS), (2, Mode.POS) };
            yield return new object[] { "7,1,2,3", Op.LESS, (1, Mode.POS), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "8,1,2,3", Op.EQUAL, (1, Mode.POS), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "9,9", Op.ADJ_REL_BASE, (9, Mode.POS)};
            yield return new object[] { "99", Op.HALT };
        }
    }
    public static IEnumerable<object[]> ParseNextInstruction_TestData_ParameterModes
    {
        get
        {
            yield return new object[] { "101,1,2,3", Op.ADD, (1, Mode.IM), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "1001,1,2,3", Op.ADD, (1, Mode.POS), (2, Mode.IM), (3, Mode.POS) };
            yield return new object[] { "10001,1,2,3", Op.ADD, (1, Mode.POS), (2, Mode.POS), (3, Mode.IM) };
            yield return new object[] { "11101,1,2,3", Op.ADD, (1, Mode.IM), (2, Mode.IM), (3, Mode.IM) };
            yield return new object[] { "201,1,2,3", Op.ADD, (1, Mode.REL), (2, Mode.POS), (3, Mode.POS) };
            yield return new object[] { "2001,1,2,3", Op.ADD, (1, Mode.POS), (2, Mode.REL), (3, Mode.POS) };
            yield return new object[] { "20001,1,2,3", Op.ADD, (1, Mode.POS), (2, Mode.POS), (3, Mode.REL) };
            yield return new object[] { "22201,1,2,3", Op.ADD, (1, Mode.REL), (2, Mode.REL), (3, Mode.REL) };
        }
    }

    [Theory]
    [MemberData(nameof(ParseNextInstruction_TestData_Operations))]
    [MemberData(nameof(ParseNextInstruction_TestData_ParameterModes))]
    public void ParseNextInstruction(string program, Op op, params (int, Mode)[] args) 
    {
        // arrange 
        var memory = new Memory(program);
        var state = new State();
        var parser = new Parser();

        // act
        var actual = parser.ParseNextInstruction(memory, state);

        // assert
        Assert.Equal(op, actual.op);
        Assert.Equal(args, actual.args.Select(arg => (arg.adr, arg.mode)));
    }
}

