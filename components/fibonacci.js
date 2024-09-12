const condition = (_, input) => {
  if (!isNaN(input)) {
    input = Number(input);
    if (input == 0 || input == 1) {
      return `  "${input} is a fibonacci number."`;
    }
   
    let a = 0,
      b = 1,
      c;
   
    while (true) {
      c = a + b;
      a = b;
      b = c;
   
      if (c == input) {
        return `  "${input}" is a fibonacci number.`;
      } else if (c >= input) {
        return `  "${input}" is not a fibonacci number.`;
      }
    }
  }
  
  return `  "${input}" is not a valid number.`;
}

const inputIdx = 0;

const powerOptions = {
  "tab": "    ",
  "return": "."
};

const newSelectors = [
  "Number:",
  "Return"
];

module.exports = { condition, select: null, inputIdx, powerOptions, tabs: null, newSelectors };