const parts = [
  //  { name: "Part A", values: { size: 1.5, amount: 10000, enum: "21" } },
  //  { name: "Another Part", values: { size: 100, amount: 1000, enum: "21" } },
  {
    name: "Best Part",
    values: {
      size_l: 10,
      size_w: 20,
      size_h: 310,
      amount: 100,
      enum: "21324"
    }
  }
];

// get enum values with getEnumValue(values, "name of enum")
const enumValues = { "21324": 1, "21": 0.5 };

// blackboxes
// should return a number between 0 and 1

function anyBlackbox(values) {
  if (values.size < 1) return 1;
  if (values.size < 5) return 0.5;
  return 0;
}

function size_Blackbox(values) {
  var size;

  size = values.size_l * values.size_w * values.size_h;

  if (values.size < 1) return 1;
  if (values.size < 5) return 0.5;
  return 0;
}

// scores

function economical(values) {
  return anyBlackbox(values) / values.amount;
}

function technological(values) {
  return getEnumValue(values, "enum");
}

// define score functions
const scores = [economical, technological];

// helper functions
function getEnumValue(values, name) {
  return enumValues[values[name]];
}

// ignore: render output
const head = ["Name"]
  .concat(scores.map(score => score.name))
  .map(x => `<th>${x}</th>`)
  .join("");
const body = parts
  .map(
    part =>
      `<tr><td>${part.name}</td> ${scores
        .map(score => `<td>${score(part.values)}</td>`)
        .join("")}</tr>`
  )
  .join("");
document.getElementById(
  "app"
).innerHTML = `<table class="table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
