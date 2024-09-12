require("node:readline").emitKeypressEvents(process.stdin);
const hexadecimal = require("./components/hexadecimal");
const alphabetical = require("./components/sorter");
const fibonacci = require("./components/fibonacci");

const tools = {
    "tools": {
        condition: null,
        select: null,
        inputIdx: null,
        inputs: null,
        tabs: null,
        newSelectors: [
            "Hexadecimal Convertor",
            "Alphabetical Sorter",
            "Fibonacci Detector"
        ]
    },
    "hexadecimal": hexadecimal,
    "alphabetical": alphabetical,
    "fibonacci": fibonacci
};

let selectors, input, idx, loc;

const draw = (idx) => {
    // Component.
    const component = tools[loc.split(" ")[0].toLowerCase()];

    // Conditionals.
    const inSelectorTab = loc.endsWith(" | Selector");

    // Console prep/header.
    console.clear();
    console.log(`\n\n        <--- ${loc} --->\n\n\n`);

    // Draw selectors.
    selectors.forEach((selector, selIdx) => {
        console.log(`${component.tabs && !inSelectorTab ? "\n".repeat(component.tabs[selIdx]) : ""}   ${selIdx === idx ? ">" : " "} ` + 
        `${selector} ${component.select && component.select[0] === selIdx && !inSelectorTab ? `(${component.select[2]})` : ""}` + 
        `${selIdx === component.inputIdx ? input : ""}${idx === selIdx && selIdx === component.inputIdx && !inSelectorTab ? "|" : ""}`);
    });

    // Use conditional for input.
    if (component.condition && input !== "" && idx === component.inputIdx) 
        console.log(`\n\n${component.condition(component.select ? component.select[2] : "", input)}`);

    // Additional spacing.
    console.log("\n\n\n");
}

const update = (name) => {
    loc = name;
    selectors = tools[name.split(" ")[0].toLowerCase()].newSelectors;
    idx = 0;
    input = "";
}

const select = (name) => {
    loc = name;
    selectors = tools[name.split(" ")[0].toLowerCase()].select[1];
    idx = 0;
    input = "";
}

const updateType = () => {
    tools[loc.split(" ")[0].toLowerCase()].select[2] = selectors[idx].toLowerCase();
    update(loc.split(" | ")[0]);
}

update("Tools");
draw(idx);

// On keypress.
process.stdin.on("keypress", (_, key) => {
    // Component.
    const component = tools[loc.split(" ")[0].toLowerCase()];

    // Conditionals.
    const inSelectorTab = loc.endsWith(" | Selector");
    const equalsInputIdx = idx === component.inputIdx && !inSelectorTab;
    const equalsSelectIdx = component.select && idx === component.select[0] && !inSelectorTab;

    // Up and down arrows selection.
    const length = selectors.length - 1;
    if (key.name === "up" || (key.name === "w" && !equalsInputIdx)) idx = idx === 0 ? length : idx - 1;
    else if (key.name === "down" || (key.name === "s" && !equalsInputIdx)) idx = idx === length ? 0 : idx + 1;

    // Return to home page if enter is pressed.
    else if (key.name === "return" && selectors[idx] === "Return") update("Tools");

    // Enter selector page if enter is pressed on select option.
    else if (key.name === "return" && equalsSelectIdx) select(loc += " | Selector");

    // Insert powerOptions if a power trigger is pressed on input option.
    else if ((key.name === "return" || key.name === "tab") && equalsInputIdx) input += component.powerOptions[key.name];

    // If enter is pressed on selector tab.
    else if (inSelectorTab && key.name === "return") updateType();

    // Select tool if enter is pressed.
    else if (key.name === "return") update(selectors[idx]);

    // Quit software if q or escape is pressed.
    else if ((key.name === "q" && idx !== component.inputIdx) || key.name === "escape") process.stdin.pause();

    // If inputting spaces.
    else if (equalsInputIdx && key.name === "space") input += " ";

    // If backspacing characters from input.
    else if (equalsInputIdx && key.name === "backspace") input = input.slice(0, -1);

    // If inputting text or numbers.
    else if (equalsInputIdx && (key.name && key.name !== "return")) input += key.name;
    
    // Redraw interface.
    draw(idx);
});

process.stdin.setRawMode(true);

