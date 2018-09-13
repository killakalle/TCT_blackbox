const parts = [
  {
    name: "Best Part",
    values: {
      price: 1020,
      demand: 10,
      minOrderQuantity: 10,
      supplyLeadTime: "within 90 days",
      qualification: false,
      size_l: 120,
      size_w: 200,
      size_h: 201,
      material: "PA66",
      partVisible: null,
      surfaceQuality: "rough",
      tolerances: "0.4 mm",
      color: null,
      heatResistance: true,
      coldResistance: false
    }
  },
  {
    name: "Second Best Part",
    values: {
      price: 120,
      demand: 103,
      minOrderQuantity: 10,
      supplyLeadTime: "within 90 days",
      qualification: false,
      size_l: 120,
      size_w: 200,
      size_h: 201,
      material: "PA66",
      partVisible: null,
      surfaceQuality: "rough",
      tolerances: "0.4 mm",
      color: null,
      heatResistance: true,
      coldResistance: false
    }
  },
  {
    name: "Third Best Part",
    values: {
      price: 20,
      demand: 1003,
      minOrderQuantity: 1001,
      supplyLeadTime: "within 90 days",
      qualification: true,
      size_l: 120,
      size_w: 9000,
      size_h: 201,
      material: "Grey cast iron",
      partVisible: true,
      surfaceQuality: "smooth",
      tolerances: "0.1 mm",
      color: "unicolor",
      heatResistance: true,
      coldResistance: false
    }
  }
];

// blackboxes
// should return a number between 0 and 1

// Econ score blackoxes //

function bb_price(values) {
  if (values.price == null) return null;

  switch (true) {
    case values.price < 50:
      return 0;
    case values.price < 100:
      return 0.3;
    case values.price < 500:
      return 0.5;
    case values.price < 1000:
      return 0.7;
    default:
      return 1;
  }
}
function bb_demand(values) {
  if (values.demand == null) return null;

  switch (true) {
    case values.demand < 10:
      return 1;
    case values.demand < 100:
      return 0.7;
    case values.demand < 500:
      return 0.5;
    case values.demand < 1000:
      return 0.3;
    default:
      return 1;
  }
}
function bb_supplyLeadTime(values) {
  if (values.supplyLeadTime == null) return null;

  switch (values.supplyLeadTime) {
    case "within 0-3 days":
      return 0;
    case "within 7 days":
      return 0.25;
    case "within 14 days":
      return 0.5;
    case "within 30 days":
      return 0.77;
    case "within 90 days":
      return 0.88;
    case "currently not available":
      return 0.1;
  }
}
function bb_minOrderQuantity(values) {
  if (values.minOrderQuantity == null) return null;

  switch (true) {
    case values.demand < 10:
      return 0.1;
    case values.demand < 50:
      return 0.22;
    case values.demand < 100:
      return 0.45;
    case values.demand < 500:
      return 0.72;
    case values.demand < 1000:
      return 0.88;
    default:
      return 1;
  }
}
function bb_qualification(values) {
  if (values.qualification == null) return null;

  if (values.qualification === false) return 1;
  if (values.qualification === true) return 0;
}

// Tech score blackoxes //
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
  if (values.partVisible === true) return 0.33;
  if (values.partVisible === false) return 1;
}
function bb_surfaceQuality(values) {
  if (values.surfaceQuality == null) return null;

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
    case "< 0.1 mm":
      return 0.3;
    case "0.1 mm":
      return 0.5;
    case "0.2 mm":
      return 0.6;
    case "0.3 mm":
      return 0.7;
    case "0.4 mm":
      return 0.8;
    case "0.5 mm":
      return 0.9;
    case "> 0.5 mm":
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
  if (values.heatResistance === true) return 0.35;
  else return 1;
}
function bb_coldResistance(values) {
  if (values.ColdResistance == null) return null;

  if (values.ColdResistance === true) return 0.55;
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

// ignore: render output
const head =
  ["Name"]
    .concat(scores.map(score => score.name))
    .map(x => `<th>${x}</th>`)
    .join("") + "<th>Total Score</th>";
const body = parts
  .map(
    part =>
      `<tr><td>${part.name}</td> ${scores
        .map(score => `<td>${score(part.values)}</td>`)
        .join("")}<td>${scores
        .map(score => score(part.values))
        .reduce((a, b) => a + b, 0) / 2}</td></tr>`
  )
  .join("");
document.getElementById(
  "app"
).innerHTML = `<table class="table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
