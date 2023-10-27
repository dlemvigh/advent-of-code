using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit.Sdk;

namespace AdventOfCode.Tests
{
    public class FileTestData : DataAttribute
    {
        private readonly string path;
        private readonly object[] data;
        public FileTestData(string path, params object[] data)
        {
            this.path = path;
            this.data = data;
        }

        public override IEnumerable<object[]> GetData(MethodInfo testMethod)
        {
            var fileData = ReadFile(this.path);

            var data = Prefix(fileData, this.data);

            yield return data;
        }



        public static string ReadFile(string path)
        {
            var rootDir = Directory.GetParent(Environment.CurrentDirectory)?.Parent?.Parent;
            if (rootDir == null)
            {
                throw new Exception($"Unable to determine root dir {Environment.CurrentDirectory}");
            }

            var fullpath = Path.Join(rootDir.FullName, "TestData", path);

            if (!File.Exists(fullpath))
            {
                throw new ArgumentException($"Could not find file at path: {fullpath}");
            }

            var text = File.ReadAllText(fullpath);
            return text.ReplaceLineEndings("\n").Trim();
        }

        private static object[] Prefix(object value, object[] src)
        {
            var dest = new object[1 + src.Length];

            dest[0] = value;
            Array.Copy(src, 0, dest, 1, src.Length);

            return dest;
        }
    }
}
