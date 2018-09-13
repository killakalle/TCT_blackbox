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
      enum: "21324",
      price: 120,
      amount: 103,
      size_l: 120,
      size_w: 200,
      size_h: 200,
      material: "PA66",
      partVisible: null,
      surfaceQuality: "rough",
      tolerances: "4/10",
      color: null,
      heatResistance: true,
      coldResistance: false
    }
  }
];

// get enum values with getEnumValue(values, "name of enum")
const enumValues = { "21324": 1, "21": 0.5 };
const enumSurfaceQuality = { rough: 1, medium: 0.5, smooth: 0.1 };
const enumTolerances = {
  "< 1/10": 0.3,
  "1/10": 0.5,
  "2/10": 0.6,
  "3/10": 0.7,
  "4/10": 0.8,
  "5/10": 0.9,
  "> 5/10": 1
};

// blackboxes
// should return a number between 0 and 1

function anyBlackbox(values) {
  if (values.whatever == null) return null;

  if (values.size < 1) return 1;
  if (values.size < 5) return 0.5;
  return 0;
}

// Econ score blackoxes

function bb_price(values) {
  if (values.price == null) return null;

  // UPDATE ME WITH CORRECT VALUES
  switch (true) {
    case values.price < 700:
      return 0.5;
    case values.price < 1000:
      return 0.7;
    case values.price < 125000:
      return 1;
    case values.price < 3375000:
      return 0.7;
    case values.price < 54872000:
      return 0.5;
    default:
      return 0;
  }
}

function bb_demand(values) {
  if (values.demand == null) return null;
}
function bb_minOrderQuantity(values) {
  if (values.minOrderQuantity == null) return null;
}
function bb_supplyLeadTime(values) {
  if (values.supplyLeadTime == null) return null;
}
function bb_qualification(values) {
  if (values.qualification == null) return null;
}

// Tech score blackoxes

function bb_size(values) {
  if (values.size_l == null || values.size_w == null || values.size_h == null)
    return null;

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

function bb_material(values) {
  if (values.material == null) return null;
  //return getEnumSurfaceQualityValue(values, "enumSurfaceQuality");
  switch (values.material) {
    case "ABS":
    case "PA6":
    case "PA11":
    case "PA12":
    case "TPE":
    case "AISI 304":
      return 1;
    case "PA6 + 30%GF":
      return 0.8;
    case "AISI 302":
    case "PA66":
    case "PA66 + 30%GF":
    case "POM":
    case "Neoprene":
      return 0.5;
    case "Grey cast iron":
      return 0.3;
  }
}

function bb_partVisible(values) {
  if (values.partVisible == null) return null;
  if (values.partVisible == true) return 0.33;
  else return 1;
}

function bb_surfaceQuality(values) {
  if (values.surfaceQuality == null) return null;

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

function bb_tolerances(values) {
  if (values.tolerances == null) return null;
  switch (values.tolerances) {
    case "< 1/10":
      return 0.3;
    case "1/10":
      return 0.5;
    case "2/10":
      return 0.6;
    case "3/10":
      return 0.7;
    case "4/10":
      return 0.8;
    case "5/10":
      return 0.9;
    case "> 5/10":
      return 1;
    default:
      return 0;
  }
}

function bb_color(values) {
  if (values.color == null) return null;
  switch (values.color) {
    case "unicolor":
      return 1;
    case "multi color":
      return 0.4;
    default:
      return 0;
  }
}

function bb_heatResistance(values) {
  if (values.heatResistance == null) return null;
  if (values.heatResistance == true) return 0.35;
  else return 1;
}

function bb_coldResistance(values) {
  if (values.ColdResistance == null) return null;

  if (values.ColdResistance == true) return 0.55;
  else return 1;
}

// scores

function economical(values) {
  var score_econ = 0;

  var blackboxes = [
    bb_price,
    bb_demand,
    bb_minOrderQuantity,
    bb_supplyLeadTime,
    bb_qualification
  ];

  var countNull = 0;
  var bbRes;
  for (var i = 0; i < blackboxes.length; i++) {
    bbRes = blackboxes[i](values);
    if (bbRes == null) countNull++;
    else score_econ += blackboxes[i](values);
  }

  return score_econ / (blackboxes.length - countNull);
}

function technological(values) {
  //  return getEnumValue(values, "enum");
  var score_tech = 0;

  var blackboxes = [
    bb_size,
    bb_material,
    bb_partVisible,
    bb_surfaceQuality,
    bb_tolerances,
    bb_color,
    bb_heatResistance,
    bb_coldResistance
  ];

  var countNull = 0;
  var bbRes;
  for (var i = 0; i < blackboxes.length; i++) {
    bbRes = blackboxes[i](values);
    if (bbRes == null) countNull++;
    else score_tech += blackboxes[i](values);
  }

  return score_tech / (blackboxes.length - countNull);
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
