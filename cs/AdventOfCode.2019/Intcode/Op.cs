using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode
{
    public enum Op
    {
        ADD = 1,
        MUL = 2,
        IN = 3,
        OUT = 4,
        JUMP_TRUE = 5,
        JUMP_FALSE = 6,
        LESS = 7,
        EQUAL = 8,
        ADJ_REL_BASE = 9,
        HALT = 99
    }
}
