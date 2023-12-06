using Xunit;
using AdventOfCode2019.Intcode;
using System;
using AdventOfCode2019.Intcode.Models;

namespace AdventOfCode2019.Tests;

public class ALUTests
{
    public static IEnumerable<object[]> ExecuteInstruction_MemoryAddress_TestData {
        get {
            yield return new object[] { "1,0,0,4", new State(), "2,0,0,0", new State { MemoryAddress = 4 } };
        }
    }

    [Theory]
    [MemberData(nameof(ExecuteInstruction_MemoryAddress_TestData))]
    public void ExecuteInstruction(string programBefore, State stateBefore, string programAfter, State stateAfter) {
        // arrange 
        var memory = new Memory(programBefore, stateBefore);
        var parser = new Parser(memory, stateBefore);
        var inputs = new Queue<int>();
        var outputs = new Queue<int>();
        var sut = new ALU(memory, stateBefore, inputs, outputs);

        var inst = parser.ParseNextInstruction();

        // act
        sut.ExecuteInstruction(inst);

        // assert
        var expected = new Memory(programAfter, stateAfter);
        Assert.Equal(expected.State, memory.State);
        Assert.Equal(expected.Program, memory.Program);
    }

    // [Theory]
    // [MemberData(nameof(ExecuteInstruction_MemoryAddress_TestData))]
    // public void ExecuteInstruction_Input(string programBefore, State stateBefore, string programAfter, State stateAfter) {
    //     // arrange 
    //     // var memory = new Memory(programBefore, stateBefore);
    //     IMemory memory = null;
    //     State state = null;
    //     var inputs = new Queue<int>();
    //     var outputs = new Queue<int>();
    //     var sut = new ALU(memory, state, inputs, outputs);

    //     var inst = new Instruction(
    //         Op.IN,
    //         inputs: new [] {
    //             new Arg(adr, mode)
    //         }
    //     )

    //     // act
    //     sut.ExecuteInstruction(inst);

    //     // assert
    //     // expect reads are called
    //     // expect writes are called
    //     // expect inputs are dequeued
    //     // expect outputs are enqueued
    // }

}
