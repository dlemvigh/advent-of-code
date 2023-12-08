using System;
using AdventOfCode2019.Intcode;
using AdventOfCode2019.Intcode.Models;
using Moq;
using Xunit;

namespace AdventOfCode2019.Tests;

public class ComputerTests
{
    private readonly Computer sut;
    private readonly Mock<IALU> mockALU;
    private readonly Mock<IMemory> mockMemory;
    private readonly Mock<IParser> mockParser;
    private readonly State state;

    public ComputerTests()
    {
        mockMemory = new Mock<IMemory>();
        mockParser = new Mock<IParser>();
        mockALU = new Mock<IALU>();
        state = new State();

        sut = new Computer(mockMemory.Object, mockParser.Object, mockALU.Object, state);
    }

    [Fact]
    public void RunTillHalt_WhenCalled_StopsAtHaltInstruction()
    {
        // Arrange
        var instruction = new Instruction( Op.HALT, new Arg[]{ } );
        mockParser.Setup(p => p.ParseNextInstruction()).Returns(instruction);

        // Act
        sut.RunTillHalt();

        // Assert
        mockALU.Verify(a => a.ExecuteInstruction(instruction), Times.Once);
    }

    [Fact]
    public void RunTillHalt_WhenCalledWithMultiple_StopsAtHaltInstruction()
    {
      // Arrange
      mockParser.SetupSequence(p => p.ParseNextInstruction())
        .Returns(new Instruction( Op.ADD, new Arg[]{ } ))
        .Returns(new Instruction( Op.MUL, new Arg[]{ } ))
        .Returns(new Instruction( Op.IN, new Arg[]{ } ))
        .Returns(new Instruction( Op.OUT, new Arg[]{ } ))
        .Returns(new Instruction( Op.JUMP_TRUE, new Arg[]{ } ))
        .Returns(new Instruction( Op.JUMP_FALSE, new Arg[]{ } ))
        .Returns(new Instruction( Op.LESS, new Arg[]{ } ))
        .Returns(new Instruction( Op.EQUAL, new Arg[]{ } ))
        .Returns(new Instruction( Op.ADJ_REL_BASE, new Arg[]{ } ))
        .Returns(new Instruction( Op.HALT, new Arg[]{ } ))
        .Returns(new Instruction( Op.HALT, new Arg[]{ } ));

      // Act
      sut.RunTillHalt();

      // Assert
      mockALU.Verify(a => a.ExecuteInstruction(It.IsAny<Instruction>()), Times.Exactly(10));
    }

    [Fact]
    public void RunTillHaltOrOutput_WhenCalled_StopsAtHaltInstruction()
    {
        // Arrange
        var instruction = new Instruction( Op.HALT, new Arg[]{ } );
        mockParser.Setup(p => p.ParseNextInstruction()).Returns(instruction);

        // Act
        sut.RunTillHaltOrOutput();

        // Assert
        mockALU.Verify(a => a.ExecuteInstruction(instruction), Times.Once);
    }

    [Fact]
    public void RunTillHaltOrOutput_WhenCalled_StopsAtOutInstruction()
    {
        // Arrange
        var instruction = new Instruction( Op.OUT, new Arg[]{ } );
        mockParser.Setup(p => p.ParseNextInstruction()).Returns(instruction);

        // Act
        sut.RunTillHaltOrOutput();

        // Assert
        mockALU.Verify(a => a.ExecuteInstruction(instruction), Times.Once);
    }

}
