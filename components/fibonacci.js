const condition = (N) => {
  if (!isNaN(N)) {
    N = Number(N);
    if (N == 0 || N == 1) {
      return `${N} is a fibonacci number.`;
    }
   
    let a = 0,
      b = 1,
      c;
   
    while (true) {
      c = a + b;
      a = b;
      b = c;
   
      if (c == N) {
        return `${N} is a fibonacci number.`;
      } else if (c >= N) {
        return `${N} is not a fibonacci number.`;
      }
    }
  } else return `${N} is not a valid number.`;
}

const newSelectors = [
  "Input:",
  "Return"
];

module.exports = { condition, newSelectors };