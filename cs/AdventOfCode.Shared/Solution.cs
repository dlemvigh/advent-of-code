namespace AdventOfCode.Shared
{
    public class ProblemName : Attribute
    {
        public string Name { get; init; }

        public ProblemName(string name)
        {
            this.Name = name;
        }
    }

    public interface Solution
    {
        object PartOne(string input) => null;
        object PartTwo(string input) => null;
    }
}