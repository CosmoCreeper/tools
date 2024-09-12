const condition = (_, input) => {
        if (input === "") {
          return "  Please enter a comma-deliminated list.";
        }
        return `  Sorted list: "${input.split(",").sort().join(", ")}"`;
}

const inputIdx = 0;

const powerOptions = {
  "tab": "    ",
  "return": ","
};

const newSelectors = [
    "List:",
    "Return"
];

module.exports = { condition, select: null, inputIdx, powerOptions, tabs: null ,newSelectors };