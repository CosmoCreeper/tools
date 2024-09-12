const condition = (type, input) => {
    if (type !== "") {
        let types = {
            "binary": 2,
            "decimal": 10,
            "hexadecimal": 16
        };

        let int = parseInt(input, types[type]);
        let hex = int.toString(16);
        let dec = int.toString(10);
        let bin = int.toString(2);

        if (type === "binary") return `   Hex: ${hex}\n   Decimal: ${dec}`;
        else if (type === "hexadecimal") return `   Binary: ${bin}\n   Decimal: ${dec}`;
        else if (type === "decimal") return `   Binary: ${bin}\n   Hex: ${hex}`;
    }

    return `    You must use a selector.`;
}

const select = [0, [
    "Decimal",
    "Hexadecimal",
    "Binary"
], ""];
const inputIdx = 1;

const powerOptions = {
    "tab": "    ",
    "return": "."
};

const tabs = [0, 0, 1];

const newSelectors = [
    "Selector",
    "Number:",
    "Return"
];

module.exports = { condition, select, inputIdx, powerOptions, tabs, newSelectors };