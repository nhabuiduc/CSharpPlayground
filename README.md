# CSharpPlayground
- This project is a port version to TypeScript from project Roslyn of Microsoft, 
- At this state, only Syntax Parser was converted to Typescript, which run completely on javascript

1. Setup and run project:
- Using Visual Studio 2015 (it maybe ok with 2013, because they're all typescript file,anyway not tested )
- Because some problems, Project must be built in following order at the first time:
  + Net.Bcl
  + Roslyn.Core.Parser
  + Roslyn.CSharp.Parser
  + CSharpSyntaxVisualizer
Then browse Index.html file in project CSharpSyntaxVisualizer to see the Syntax Tree of C# sourcecode

2. CSharpSyntaxVisualizer page:
- Based from Syntax Visualizer tool in Roslyn project
- Input your C# sourcecode, and click Refresh Tree
- Click on any text, it will navigate to corresponding Node in Tree

3. Issues:


  
