/*
values:
size_l, size_w, size_h   in mm
*/
const bbs_tech = 2;
const bbs_econ = 2;
const parts = [
  //  { name: "Part A", values: { size: 1.5, amount: 10000, enum: "21" } },
  //  { name: "Another Part", values: { size: 100, amount: 1000, enum: "21" } },
  {
    name: "Best Part",
    values: {
      size_l: 100,
      size_w: 20,
      size_h: 310,
      partVisible: true,
      surfaceQuality: "rough",
      amount: 103,
      enum: "21324"
    }
  }
];

// get enum values with getEnumValue(values, "name of enum")
const enumValues = { "21324": 1, "21": 0.5 };
const enumSurfaceQuality = { rough: 1, medium: 0.5, smooth: 0.1 };

// blackboxes
// should return a number between 0 and 1

function anyBlackbox(values) {
  if (values.size < 1) return 1;
  if (values.size < 5) return 0.5;
  return 0;
}

function bb_size(values) {
  var size;
  size = values.size_l * values.size_w * values.size_h;

  switch (true) {
    case size < 700:
      return 0.5;
    case size < 1000:
      return 0.7;
    case size < 125000:
      return 1;
    case size < 3375000:
      return 0.7;
    case size < 54872000:
      return 0.5;
    default:
      return 0;
  }
}

function bb_partVisible(values) {
  if (values.partVisible == true) return 0.3;
  else return 1;
}

function bb_surfaceQuality(values) {
  //return getEnumSurfaceQualityValue(values, "enumSurfaceQuality");
  switch (values.surfaceQuality) {
    case "rough":
      return 1;
    case "medium":
      return 0.5;
    case "smooth":
      return 0.1;
  }
}

// scores

function economical(values) {
  return anyBlackbox(values) / values.amount;
}

function technological(values) {
  //  return getEnumValue(values, "enum");
  var score_tech = 0;

  var blackboxes = [bb_size, bb_partVisible, bb_surfaceQuality];
  var blackboxesLength = blackboxes.length;

  for (var i = 0; i < blackboxesLength; i++) {
    score_tech += blackboxes[i](values);
  }
  return score_tech / blackboxesLength;
}

// define score functions
const scores = [economical, technological];

// helper functions
function getEnumValue(values, name) {
  return enumValues[values[name]];
}

function getEnumSurfaceQualityValue(values, name) {
  return enumSurfaceQuality[values[name]];
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
