# Formula builder

## Grammar supported
```
formulaName = "ADD" | "MULTIPLY" | "DIVISION" | "SUBTRACT" ... (see built-in.ts)
reference = /*Fields.*/ (contains 'Fields' and 'dot' character)
number = /[0-9]/
openParenthesis = "("
closeParenthesis = ")"
comma = ","

Example: ADD(1, insuredFields.age, MULTIPLY(2, insuredFields.age))
```

## features
- [x] Tokenizer
- [x] Parser
- [x] Evaluator
- [x] Built-in formulas
- [x] auto-complete built-in formulas
- [ ] Line and column number for tokenizer and parser 
- [ ] Support Binary operators (+, -, *, /) (update tokenizer, parser, evaluator)
- [ ] Support comparison operators (>, <, >=, <=, ==, !=) (add IF formula)
- [ ] Validate formula's parameters (number and type)
- [ ] More built-in formulas
- [ ] Auto-complete reference
- [ ] UI: Underline the error formula
- [ ] UI: Tooltips for error message
- [ ] UI: Dropdown for auto-complete
