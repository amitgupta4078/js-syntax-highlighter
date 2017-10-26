# JavaScript Syntax Highlighter
A simple highlighter for your javascript code written in pure Javascript.

# What it does?
Takes raw javascript code as input and outputs formatted javascript code that can be added as ```innerHTML``` and thus rendered properly.
 
 It can be used
  - server side for one time formatting of code as in example code snippets
  - client side for rendering user typed code with proper formatting 

# How it does?
It uses a character by character parser that relies on Regex string matching. Individual words are separated out in ```span```.

# Demo
[JsFiddle Demo](https://jsfiddle.net/AosisTech/0dgxtfto/5/)

# Pending Checklist
This parser was written for Javascript practice and needs a lot of improvement.
- A better approach for the same problem? Parsing same character everytime a new character is added is an overhead
- Regex expressions can be improved. Something more performant than regex?
- Add support for single quote strings and backtick strings (ES6)
- Add support for comments: single line and multi line comments
- Handle new line in double quote string; currently ignores any newline
- Can be extended to provide inline formatting similar to what we get in offline editors like Sublime Text for a file with extension ```.js```. The input and output panel will be same in that case!

# Feedback/Criticism
I welcome and encourage any positive/negative feedback. Fork this repo, clone it, play with my code and make some changes. Lets collaborate!