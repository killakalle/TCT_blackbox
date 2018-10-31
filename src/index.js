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
  var propertyValue = values.complexity;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Gering":
      return 0.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 1.0;
    default:
      return 0.0;
  }
}
// Derzeitige / alte Lieferzeiten
function bb_econ_supplyLeadTime(values) {
  var propertyValue = values.supplyLeadTime;

  if (propertyValue == null) return null;

  switch (true) {
    case propertyValue <= 7:
      return 0.0;
    case propertyValue <= 30:
      return 0.5;
    case propertyValue > 30:
      return 1.0;
    default:
      return 0.0;
  }
}
// Derzeitige / alte Stückkosten
function bb_econ_partPrice(values) {
  var propertyValue = values.partPrice;

  if (propertyValue == null) return null;

  switch (true) {
    case propertyValue <= 10:
      return 0.1;
    case propertyValue <= 50:
      return 0.22;
    case propertyValue <= 100:
      return 0.45;
    case propertyValue <= 500:
      return 0.72;
    case propertyValue <= 1000:
      return 0.88;
    case propertyValue > 1000:
      return 1.0;
    default:
      return 0.0;
  }
}
// Derzeitige Mindestabnahmemenge
function bb_econ_minOrderQuantity(values) {
  var propertyValue = values.minOrderQuantity;

  if (propertyValue == null) return null;

  switch (true) {
    case propertyValue <= 10:
      return 0.1;
    case propertyValue <= 50:
      return 0.22;
    case propertyValue <= 100:
      return 0.45;
    case propertyValue <= 500:
      return 0.72;
    case propertyValue <= 1000:
      return 0.88;
    case propertyValue > 1000:
      return 1.0;
    default:
      return 0.0;
  }
}
// Frequenz
function bb_econ_frequency(values) {
  var propertyValue = values.frequency;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Jährlich":
      return 0.8;
    case "Einmalig":
      return 1.0;
    default:
      return 0.0;
  }
}
// Herkömmliche Fertigung
function bb_econ_traditionalManufacturing(values) {
  var propertyValue = values.traditionalManufacturing;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Drehen":
      return 0.3;
    case "Fräsen":
      return 0.5;
    case "Gießen":
      return 0.8;
    case "Spritzgießen":
      return 1.0;
    default:
      return 0.0;
  }
}
// Sicherheitsrelevanz
function bb_econ_safetyRelevance(values) {
  var propertyValue = values.safetyRelevance;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Stückzahl
function bb_econ_quantity(values) {
  var propertyValue = values.quantity;

  if (propertyValue == null) return null;

  switch (true) {
    case propertyValue < 10:
      return 1.0;
    case propertyValue < 100:
      return 0.7;
    case propertyValue < 500:
      return 0.5;
    case propertyValue < 1000:
      return 0.3;
    default:
      return 0.0;
  }
}
// Verfügbarkeitssteigerung möglich um
function bb_econ_availabilityImprovement(values) {
  var propertyValue = values.availabilityImprovement;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "einen Monat":
      return 0.0;
    case "drei Monate":
      return 0.5;
    case "sechs Monate":
      return 0.7;
    case "ein Jahr":
      return 1.0;
    default:
      return 0.0;
  }
}

// Tech score blackoxes //

// Außenbereich?
function bb_tech_outsideArea(values) {
  var propertyValue = values.outsideArea;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Innenbereich":
      return 1.0;
    case "Außenbereich":
      return 0.5;
    default:
      return 0.0;
  }
}
// Brandschutzanforderungen
function bb_tech_fireSafety(values) {
  var propertyValue = values.fireSafety;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Größe (Länge, Breite, Höhe)
function bb_tech_size(values) {
  var propertyValue_l = values.size_l;
  var propertyValue_b = values.size_b;
  var propertyValue_h = values.size_h;

  if (
    propertyValue_l == null ||
    propertyValue_b == null ||
    values.size_h == null
  )
    return null;

  var size;
  size = propertyValue_l * propertyValue_b * propertyValue_h;

  switch (true) {
    case size < 700:
      return 0.5;
    case size < 1000:
      return 0.7;
    case size < 125000:
      return 1.0;
    case size < 3375000:
      return 0.7;
    case size < 54872000:
      return 0.5;
    default:
      return 0.0;
  }
}
// Chemische Beständigkeit
function bb_tech_chemicalResistance(values) {
  var propertyValue = values.chemicalResistance;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Ein- oder mehrfarbig
function bb_tech_uniColor(values) {
  var propertyValue = values.uniColor;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "unicolor":
      return 1.0;
    case "multi color":
      return 0.4;
    default:
      return 0.0;
  }
}
// Elektrisch - isolierend
function bb_tech_electricIsolation(values) {
  var propertyValue = values.electricIsolation;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Elektrisch - leitend
function bb_tech_electroconductive(values) {
  var propertyValue = values.electroconductive;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Feuchtigkeit
function bb_tech_moisture(values) {
  var propertyValue = values.moisture;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Formgenauigkeit
function bb_tech_shapeAccuracy(values) {
  var propertyValue = values.shapeAccuracy;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Gering":
      return 1.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 0.0;
    default:
      return 0.0;
  }
}
// Grundfarbe
function bb_tech_basicColour(values) {
  var propertyValue = values.basicColour;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Weiß":
    case "Schwarz":
    case "Blau":
    case "Rot":
    case "Gelb":
      return 1.0;
    case "Andere":
      return 0.0;
    default:
      return 0.0;
  }
}
// Hitzebeständigkeit
function bb_tech_heatResistance(values) {
  var propertyValue = values.heatResistance;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Hygiene
function bb_tech_hygiene(values) {
  var propertyValue = values.hygene;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Kältebeständigkeit
function bb_tech_coldResistance(values) {
  var propertyValue = values.coldResistance;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Mechanisch (Art)
function bb_tech_mechanicalForceType(values) {
  var propertyValue = values.mechanicalForceType;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "statisch":
      return 1.0;
    case "dynamisch":
      return 0.5;
    default:
      return 0.0;
  }
}
// Mechanisch (Intensität)
function bb_tech_mechanicalForceIntensity(values) {
  var propertyValue = values.mechanicalForceIntensity;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Gering":
      return 1.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 0.0;
    default:
      return 0.0;
  }
}
// Oberfläche
function bb_tech_surface(values) {
  var propertyValue = values.surface;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Rau":
      return 1.0;
    case "Normal":
      return 0.5;
    case "Glatt/Glänzend":
      return 0.0;
    default:
      return 0.0;
  }
}
// Originalwerkstoff
function bb_tech_originalMaterial(values) {
  var propertyValue = values.originalMaterial;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "ABS":
    case "PA6":
    case "PA11":
    case "PA12":
    case "TPE":
    case "AISI 304":
      return 1.0;
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
    default:
      return 0.0;
  }
}
// Sichtteil
function bb_tech_visiblePart(values) {
  var propertyValue = values.visiblePart;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// UV-Beständigkeit
function bb_tech_uvResistance(values) {
  var propertyValue = values.uvResistance;

  if (propertyValue == null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Werkstoffklasse
function bb_tech_material(values) {
  var propertyValue = values.material;

  if (propertyValue == null) return null;

  switch (propertyValue) {
    case "Kunstoff":
      return 1.0;
    case "Metall":
      return 1.0;
    case "Sonstiges":
      return 0.0;
    default:
      return 0.0;
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
