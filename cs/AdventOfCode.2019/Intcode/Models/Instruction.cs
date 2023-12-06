using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode2019.Intcode.Models
{
    public record Instruction(Op op, params Arg[] args);
    public record Arg(int adr, Mode mode);
}
