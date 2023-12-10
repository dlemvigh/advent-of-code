using Xunit;
using AdventOfCode2019.Intcode;
using System;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Tests;

public class MemoryTests
{
    private Memory CreateTestMemory(string program, int relBase = 0)
    {
        var state = new State(RelativeBase: relBase);
        var memory = new Memory(program, state);
        return memory;
    }

    [Theory]
    [InlineData("1 2 3", 0, 0, Mode.POS, 1)] // Test ReadPos
    [InlineData("1 2 3", 0, 1, Mode.POS, 2)] // Test ReadPos
    [InlineData("1 2 3", 0, 2, Mode.POS, 3)] // Test ReadPos
    [InlineData("1 2 3", 0, 7, Mode.IM, 7)]  // Test Immediate mode
    [InlineData("1 2 3", 0, 0, Mode.REL, 1)] // Test ReadRel with RelativeBase = 0
    [InlineData("1 2 3", 0, 1, Mode.REL, 2)] // Test ReadRel with RelativeBase = 0
    [InlineData("1 2 3", 1, 0, Mode.REL, 2)] // Test ReadRel with RelativeBase = 1
    [InlineData("1 2 3", 1, 1, Mode.REL, 3)] // Test ReadRel with RelativeBase = 1
    [InlineData("1 2 3", 0, 99, Mode.POS, 0)]// Test ReadPos out of bounds
    [InlineData("1 2 3", 99, 0, Mode.REL, 0)]// Test ReadPos out of bounds
    public void Read_ShouldReturnCorrectValue(string program, int relBase, int adr, Mode mode, int expected)
    {
        var memory = CreateTestMemory(program, relBase);
        var result = memory.Read(adr, mode);
        Assert.Equal(expected, result);
    }

    [Theory]
    [InlineData("1 2 3 4", 0, 0, Mode.POS, 99)] // Test WritePos
    [InlineData("1 2 3 4", 0, 1, Mode.POS, 99)] // Test WritePos
    [InlineData("1 2 3 4", 0, 0, Mode.REL, 99)] // Test WriteRel with RelativeBase = 0
    [InlineData("1 2 3 4", 0, 1, Mode.REL, 99)] // Test WriteRel with RelativeBase = 0
    [InlineData("1 2 3 4", 1, 0, Mode.REL, 99)] // Test WriteRel with RelativeBase = 1
    [InlineData("1 2 3 4", 1, 1, Mode.REL, 99)] // Test WriteRel with RelativeBase = 1
    [InlineData("1 2 3 4", 0, 99, Mode.POS, 99)]// Test WritePos out of bounds
    [InlineData("1 2 3 4", 99, 0, Mode.POS, 99)]// Test WritePos out of bounds
    public void Write_ShouldModifyMemory(string program, int relBase, int adr, Mode mode, int value)
    {
        var memory = CreateTestMemory(program, relBase);
        memory.Write(adr, mode, value);
        Assert.Equal(value, memory.Read(adr, mode));
    }

    [Theory]
    [InlineData(0, 5, 5)] // Test UpdateRelBase
    [InlineData(5, 5, 10)] // Test UpdateRelBase
    [InlineData(5, -5, 0)] // Test UpdateRelBase
    public void UpdateRelBase_ShouldUpdateRelativeBase(int initialBase, int value, int expectedBase)
    {
        var memory = CreateTestMemory("1 2 3 4", initialBase);
        memory.UpdateRelBase(value);
        Assert.Equal(expectedBase, memory.State.RelativeBase);
    }

    [Theory]
    [InlineData("1 2 3 4", 1, (Mode)99)]  // Test invalid mode
    public void Read_ShouldThrowExceptionForInvalidInput(string program, int adr, Mode mode)
    {
        var memory = CreateTestMemory(program);
        Assert.Throws<ArgumentException>(() => memory.Read(adr, mode));
    }

    [Theory]
    [InlineData("1 2 3 4", 1, Mode.IM, 99)]  // Test invalid mode
    [InlineData("1 2 3 4", 1, (Mode)99, 99)]  // Test invalid mode
    public void Write_ShouldThrowExceptionForInvalidInput(string program, int adr, Mode mode, int value)
    {
        var memory = CreateTestMemory(program);
        Assert.Throws<ArgumentException>(() => memory.Write(adr, mode, value));
    }

}
