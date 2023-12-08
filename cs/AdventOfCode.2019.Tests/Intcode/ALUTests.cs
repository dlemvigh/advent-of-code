using Xunit;
using AdventOfCode2019.Intcode;
using System;
using AdventOfCode2019.Intcode.Models;
using Moq;
using Microsoft.VisualStudio.TestPlatform.Utilities;

namespace AdventOfCode2019.Tests;

public class ALUTests
{
    private readonly ALU sut;
    private readonly Mock<IMemory> mockMemory;
    private readonly State state;
    private readonly Queue<int> inputQueue;
    private readonly Queue<int> outputQueue;

    public ALUTests()
    {
        // Common setup for all tests
        mockMemory = new Mock<IMemory>();
        state = new State(); // Assuming this is a valid class
        inputQueue = new Queue<int>();
        outputQueue = new Queue<int>();

        sut = new ALU(mockMemory.Object, state, inputQueue, outputQueue);
    }

    [Theory]
    [InlineData(2, 2, 4)]
    [InlineData(2, -2, 0)]
    [InlineData(-2, -2, -4)]
    public void ExecuteAdd(int a, int b, int expected)
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.ADD, inputs, output);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(a);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(b);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(m => m.Write(output, expected), Times.Once());
    }

    [Theory]
    [InlineData(1, 1, 1)]
    [InlineData(0, 1, 0)]
    [InlineData(1, 0, 0)]
    [InlineData(1, -1, -1)]
    [InlineData(-1, 1, -1)]
    [InlineData(-1, -1, 1)]
    [InlineData(2, 3, 6)]
    public void ExecuteMultiply(int a, int b, int expected)
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.MUL, inputs, output);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(a);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(b);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(m => m.Write(output, expected), Times.Once());
    }

    [Theory]
    [InlineData(0, 99, 0)]
    [InlineData(1, 99, 99)]
    [InlineData(-1, 99, 99)]
    public void ExecuteJumpTrue(int cond, int adr, int expected)
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var instruction = new Instruction(Op.JUMP_TRUE, inputs, null);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(cond);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(adr);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        Assert.Equal(expected, state.MemoryAddress);
    }

    [Theory]
    [InlineData(0, 99, 99)]
    [InlineData(1, 99, 0)]
    [InlineData(-1, 99, 0)]
    public void ExecuteJumpFalse(int cond, int adr, int expected)
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var instruction = new Instruction(Op.JUMP_FALSE, inputs, null);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(cond);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(adr);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        Assert.Equal(expected, state.MemoryAddress);
    }

    [Theory]
    [InlineData(0, 0, 0)]
    [InlineData(0, 1, 1)]
    [InlineData(1, 0, 0)]
    [InlineData(1, 1, 0)]
    [InlineData(1, 2, 1)]
    [InlineData(-1, -1, 0)]
    [InlineData(-2, -1, 1)]
    [InlineData(-1, 1, 1)]
    [InlineData(1, -1, 0)]
    public void ExecuteLess(int a, int b, int expected)
    {
        // Arrange
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.LESS, inputs, output);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(a);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(b);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(m => m.Write(output, expected), Times.Once());
    }

    [Theory]
    [InlineData(0, 0, 1)]
    [InlineData(0, 1, 0)]
    [InlineData(1, 0, 0)]
    [InlineData(1, 1, 1)]
    [InlineData(1, 2, 0)]
    [InlineData(-1, -1, 1)]
    [InlineData(-2, -1, 0)]
    [InlineData(-1, 1, 0)]
    [InlineData(1, -1, 0)]
    public void ExecuteEqual(int a, int b, int expected)
    {
        // Arrange
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS), new Arg(2, Mode.IM) };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.EQUAL, inputs, output);

        mockMemory.Setup(m => m.Read(inputs[0])).Returns(a);
        mockMemory.Setup(m => m.Read(inputs[1])).Returns(b);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(m => m.Write(output, expected), Times.Once());
    }

    [Fact]
    public void ExecuteInput()
    {
        // Arrange
        var inputs = new Arg[] { };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.IN, inputs, output);

        inputQueue.Enqueue(42);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(m => m.Write(output, 42), Times.Once());
    }

    [Fact]
    public void ExecuteInput_PreservesOrder()
    {
        // Arrange
        var inputs = new Arg[] { };
        var output = new Arg(3, Mode.REL);
        var instruction = new Instruction(Op.IN, inputs, output);

        inputQueue.Enqueue(1);
        inputQueue.Enqueue(2);
        inputQueue.Enqueue(3);

        // Act + Assert
        sut.ExecuteInstruction(instruction);
        mockMemory.Verify(m => m.Write(output, 1), Times.Once());
        mockMemory.VerifyNoOtherCalls();

        sut.ExecuteInstruction(instruction);
        mockMemory.Verify(m => m.Write(output, 2), Times.Once());
        mockMemory.VerifyNoOtherCalls();

        sut.ExecuteInstruction(instruction);
        mockMemory.Verify(m => m.Write(output, 3), Times.Once());
        mockMemory.VerifyNoOtherCalls();
    }

    [Fact]
    public void ExecuteOutput()
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS) };
        var instruction = new Instruction(Op.OUT, inputs);

        mockMemory.Setup(x => x.Read(inputs[0])).Returns(42);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        Assert.Equal(new[] { 42 }, outputQueue);
    }

    [Fact]
    public void ExecuteOutput_PreservesOrder()
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS) };
        var instruction = new Instruction(Op.OUT, inputs);

        mockMemory.SetupSequence(x => x.Read(inputs[0]))
            .Returns(1)
            .Returns(2)
            .Returns(3);

        // Act
        sut.ExecuteInstruction(instruction);
        sut.ExecuteInstruction(instruction);
        sut.ExecuteInstruction(instruction);

        // Assert
        Assert.Equal(new[] { 1, 2, 3 }, outputQueue);
        Assert.Equal(1, outputQueue.Dequeue());
        Assert.Equal(2, outputQueue.Dequeue());
        Assert.Equal(3, outputQueue.Dequeue());

    }

    [Fact]
    public void ExecuteUpdateRelBase()
    {
        // Arrange
        var inputs = new[] { new Arg(1, Mode.POS) };
        var instruction = new Instruction(Op.ADJ_REL_BASE, inputs);

        mockMemory.Setup(x => x.Read(inputs[0])).Returns(42);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.Verify(x => x.UpdateRelBase(42), Times.Once);
    }

    [Fact]
    public void ExecuteHalt()
    {
        // Arrange
        var inputs = new Arg[] { };
        var instruction = new Instruction(Op.HALT, inputs);

        // Act
        sut.ExecuteInstruction(instruction);

        // Assert
        mockMemory.VerifyNoOtherCalls();
    }
}
