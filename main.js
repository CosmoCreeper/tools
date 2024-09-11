require("readline").emitKeypressEvents(process.stdin);
const hexadecimal = require("./components/hexadecimal");
const alphabetical = require("./components/sorter");
const fibonacci = require("./components/fibonacci");

const tools = {
    "tools": {newSelectors: [
        "Hexadecimal Convertor",
        "Alphabetical Sorter",
        "Fibonacci Detector"
    ]},
    "hexadecimal": hexadecimal,
    "alphabetical": alphabetical,
    "fibonacci": fibonacci
};

let selectors = [
    "Hexadecimal Convertor",
    "Alphabetical Sorter",
    "Fibonacci Detector"
];

let input;

let idx = 0;
let loc = "Tools";

const draw = (idx) => {
    console.clear();
    console.log(`\n\n        <--- ${loc} --->\n\n\n`);
    

    selectors.forEach((selector, selIdx) => {
        console.log(`    ${selIdx === idx ? ">" : " "} ${selector} ${selector === "Input:" ? input : ""}`);
    });

    if (loc !== "Tools" && input !== "") console.log(`\n\n      ${tools[loc.split(" ")[0].toLowerCase()].condition(input)}`);

    console.log("\n\n\n");
}

const update = (name) => {
    loc = name;
    selectors = tools[name.split(" ")[0].toLowerCase()].newSelectors;
    idx = 0;
    input = "";
}

draw(idx);

// On keypress.
process.stdin.on("keypress", (_, key) => {
    if (key) {
        // Up and down arrows selection.
        const length = selectors.length - 1;
        if (key.name === "up") idx = idx === 0 ? length : idx - 1;
        else if (key.name === "down") idx = idx === length ? 0 : idx + 1;

        // Return to home page if enter is pressed.
        else if (key.name === "return" && selectors[idx] === "Return") update("Tools");

        // Select tool if enter is pressed.
        else if (key.name === "return") update(selectors[idx]);

        // Quit software if q or escape is pressed.
        else if ((key.name === "q" && loc === "Tools") || key.name === "escape") process.stdin.pause();

        // If inputting text or numbers.
        else if (selectors[idx] === "Input:" && key.name !== "backspace") input += key.name;

        // If backspacing characters from input.
        else if (selectors[idx] === "Input:" && key.name === "backspace") input = input.slice(0, -1);

        // Redraw interface.
        draw(idx);
    }
});

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

