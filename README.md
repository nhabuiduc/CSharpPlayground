# CSharpPlayground
 This project is a port version to TypeScript from project Roslyn of Microsoft,   
 At this state, only Syntax Parser was converted to Typescript, which run completely on javascript  

1 . Setup and run project:  
.Using Visual Studio 2015 (it maybe ok with 2013, because they're all typescript file,not tested! )  
.Projects must be built in following order manually at the first time:  
  - Net.Bcl
  - Roslyn.Core.Parser
  - Roslyn.CSharp.Parser
  - CSharpSyntaxVisualizer  
    
.Then browse Index.html file in project CSharpSyntaxVisualizer to see the Syntax Tree of C# sourcecode

2 . CSharpSyntaxVisualizer page:  
 . Demo page: http://bdnprojects.net/CSharpSyntaxParser/  
 .Based on Syntax Visualizer tool in Roslyn project  
 .Input your C# sourcecode to see Syntax tree refreshed
 .Click on any text, it will navigate to corresponding Node in Tree  

3 . Roadmap:  
  . Create library to convert c# code into typescript code (partialy done, source is not available yet, because it's not clean and mess up with a lot hacks and tricks for specific Roslyn code).   
  . Convert c# Syntax parser part in Roslyn into typescript (done for version ctp5).   
  . Create csharp syntax visualizer tool online as in Roslyn (done).   
  . Integrate with code editor online (codemirror or ace edior) for simple highlighting (in progress).   
  . Add syntax error checking on online code editor. 
  . Convert c# semantic analyzer part in Roslyn into Typescript.  
  . Make syntax highlighting more accurate with sematic information.  
  . Add code complete feature to online code editor.   
  . Add feature which loads metadata information of .net dll from server to client, so it will support code complete for reference .net libraries





  
