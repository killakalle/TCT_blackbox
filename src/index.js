const parts = [
  {
    name: "Best Part",
    values: {
      price: 10200,
      demand: 9,
      minOrderQuantity: 11000,
      supplyLeadTime: "within 90 days",
      qualification: true,
      size_l: 120,
      size_w: 200,
      size_h: 201,
      material: "PA6",
      partVisible: false,
      surfaceQuality: "rough",
      tolerances: "0.5 mm",
      color: "unicolor",
      heatResistance: false,
      coldResistance: true
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

// Bauteilkomplexität
function bb_econ_complexity(values) {
  if (values.complexity == null) return null;

  switch (values.complexity) {
    case "gering":
      return 0.3;
    case "mittel":
      return 0.6;
    case "hoch":
      return 1.0;
  }
}
// Derzeitige / alte Lieferzeiten
function bb_econ_supplyLeadTime(values) {
  if (values.supplyLeadTime == null) return null;

  switch (true) {
    case values.supplyLeadTime < 10:
      return 0.1;
    case values.supplyLeadTime < 50:
      return 0.22;
    case values.supplyLeadTime < 100:
      return 0.45;
    case values.supplyLeadTime < 500:
      return 0.72;
    case values.supplyLeadTime < 1000:
      return 0.88;
    default:
      return 1;
  }
}
// Derzeitige / alte Stückkosten
function bb_econ_partPrice(values) {
  if (values.partPrice == null) return null;

  switch (true) {
    case values.partPrice < 50:
      return 0;
    case values.partPrice < 100:
      return 0.3;
    case values.partPrice < 500:
      return 0.5;
    case values.partPrice < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Derzeitige Mindestabnahmemenge
function bb_econ_minOrderQuantity(values) {
  if (values.minOrderQuantity == null) return null;

  switch (true) {
    case values.minOrderQuantity < 10:
      return 0.1;
    case values.minOrderQuantity < 50:
      return 0.22;
    case values.minOrderQuantity < 100:
      return 0.45;
    case values.minOrderQuantity < 500:
      return 0.72;
    case values.minOrderQuantity < 1000:
      return 0.88;
    default:
      return 1;
  }
}
// Frequenz
function bb_econ_frequency(values) {
  if (values.frequency == null) return null;

  return null;
}
// Herkömmliche Fertigung
function bb_econ_traditionalManufacturing(values) {
  if (values.traditionalManufacturing == null) return null;

  switch (values.traditionalManufacturing) {
    case values.traditionalManufacturing < 50:
      return 0;
    case values.traditionalManufacturing < 100:
      return 0.3;
    case values.traditionalManufacturing < 500:
      return 0.5;
    case values.traditionalManufacturing < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Sicherheitsrelevanz
function bb_econ_safetyRelevance(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Stückzahl
function bb_econ_quantity(values) {
  if (values.quantity == null) return null;

  switch (true) {
    case values.quantity < 10:
      return 1;
    case values.quantity < 100:
      return 0.7;
    case values.quantity < 500:
      return 0.5;
    case values.quantity < 1000:
      return 0.3;
    default:
      return 0;
  }
}
// Verfügbarkeitssteigerung möglich um
function bb_econ_availabilityImprovement(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}

// Tech score blackoxes //

// Außenbereich?
function bb_tech_outsideArea(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Brandschutzanforderungen
function bb_tech_fireSafety(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Größe (Länge, Breite, Höhe)
function bb_tech_size(values) {
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
// Chemische Beständigkeit
function bb_tech_chemicalResistance(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Ein- oder mehrfarbig
function bb_tech_uniColor(values) {
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
// Elektrisch - isolierend
function bb_tech_electricIsolation(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Elektrisch - leitend
function bb_tech_electroconductive(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Feuchtigkeit
function bb_tech_moisture(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Formgenauigkeit
function bb_tech_shapeAccuracy(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Grundfarbe
function bb_tech_basicColour(values) {
  if (values.XXX == null) return null;

  switch (true) {
    case values.XXX < 50:
      return 0;
    case values.XXX < 100:
      return 0.3;
    case values.XXX < 500:
      return 0.5;
    case values.XXX < 1000:
      return 0.7;
    default:
      return 1;
  }
}
// Hitzebeständigkeit
function bb_tech_heatResistance(values) {
  if (values.heatResistance == null) return null;
  if (values.heatResistance === true) return 0.35;
  else return 1;
}
// Hygiene
function bb_tech_hygiene(values) {
  if (values.heatResistance == null) return null;
  if (values.heatResistance === true) return 0.35;
  else return 1;
}
// Kältebeständigkeit
function bb_tech_coldResistance(values) {
  if (values.coldResistance == null) return null;

  if (values.coldResistance === true) return 0.55;
  else return 1;
}
// Mechanisch (Art)
function bb_tech_mechanicalForceType(values) {
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
// Mechanisch (Intensität)
function bb_tech_mechanicalForceIntensity(values) {
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
// Oberfläche
function bb_tech_surface(values) {
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
// Originalwerkstoff
function bb_tech_originalMaterial(values) {
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
// Sichtteil
function bb_tech_visiblePart(values) {
  if (values.partVisible == null) return null;
  if (values.partVisible === true) return 0.33;
  if (values.partVisible === false) return 1;
}
// UV-Beständigkeit
function bb_tech_uvResistance(values) {
  if (values.coldResistance == null) return null;

  if (values.coldResistance === true) return 0.55;
  else return 1;
}
// Werkstoff
function bb_tech_material(values) {
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

// scores
function economical(values) {
  var score_econ = 0;

  var blackboxes = [
    bb_econ_partPrice,
    bb_econ_minOrderQuantity,
    bb_econ_supplyLeadTime
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
    bb_tech_size,
    bb_tech_originalMaterial,
    bb_tech_visiblePart,
    bb_tech_surfaceQuality,
    bb_tech_tolerances,
    bb_tech_uniColor,
    bb_tech_heatResistance,
    bb_tech_coldResistance
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
