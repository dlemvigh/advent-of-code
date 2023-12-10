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
        var instruction = new HaltInstruction();
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
        .Returns(new AddInstruction(It.IsAny<Arg>(), It.IsAny<Arg>(), It.IsAny<Arg>()))
        .Returns(new MultiplyInstruction(It.IsAny<Arg>(), It.IsAny<Arg>(), It.IsAny<Arg>()))
        .Returns(new InputInstruction(It.IsAny<Arg>() ))
        .Returns(new OutputInstruction(It.IsAny<Arg>() ))
        .Returns(new JumpTrueInstruction(It.IsAny<Arg>(), It.IsAny<Arg>() ))
        .Returns(new JumpFalseInstruction(It.IsAny<Arg>(), It.IsAny<Arg>()))
        .Returns(new LessThanInstruction(It.IsAny<Arg>(), It.IsAny<Arg>(), It.IsAny<Arg>()))
        .Returns(new EqualToInstruction(It.IsAny<Arg>(), It.IsAny<Arg>(), It.IsAny<Arg>()))
        .Returns(new AdjustRelativeBaseInstruction(It.IsAny<Arg>() ))
        .Returns(new HaltInstruction())
        .Returns(new HaltInstruction());

      // Act
      sut.RunTillHalt();

      // Assert
      mockALU.Verify(a => a.ExecuteInstruction(It.IsAny<Instruction>()), Times.Exactly(10));
    }

    [Fact]
    public void RunTillHaltOrOutput_WhenCalled_StopsAtHaltInstruction()
    {
        // Arrange
        var instruction = new HaltInstruction();
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
        var instruction = new HaltInstruction();
        mockParser.Setup(p => p.ParseNextInstruction()).Returns(instruction);

        // Act
        sut.RunTillHaltOrOutput();

        // Assert
        mockALU.Verify(a => a.ExecuteInstruction(instruction), Times.Once);
    }

}
