const parts = [
  {
    name: "Best Part",
    values: {
      complexity: "Gering",
      supplyLeadTime: 25,
      partPrice: 150,
      minOrderQuantity: 100,
      frequency: "Jährlich",
      traditionalManufacturing: "Spritzgießen",
      safetyRelevance: true,
      quantity: 250,
      availabilityImprovement: "sechs Monate",
      outsideArea: "Innenbereich",
      fireSafety: false,
      size_b: 25,
      chemicalResistance: true,
      uniColor: "mehrfarbig",
      electricIsolation: true,
      electroconductive: null,
      moisture: null,
      shapeAccuracy: "Mittel",
      basicColour: "Schwarz",
      heatResistance: null,
      size_h: 144,
      hygiene: true,
      coldResistance: true,
      size_l: 122,
      mechanicalForceType: "dynamisch",
      mechanicalForceIntensity: "Mittel",
      surface: "Glatt/Glänzend",
      visiblePart: true,
      uvResistance: true,
      material: "Metall"
    }
  },
  {
    name: "Second Part",
    values: {
      complexity: "Mittel",
      supplyLeadTime: 1225,
      partPrice: 1150,
      minOrderQuantity: 100,
      frequency: "Jährlich",
      traditionalManufacturing: "Spritzgießen",
      safetyRelevance: true,
      quantity: 250,
      availabilityImprovement: "sechs Monate",
      outsideArea: "Innenbereich",
      fireSafety: true,
      size_b: 225,
      chemicalResistance: true,
      uniColor: "mehrfarbig",
      electricIsolation: true,
      electroconductive: null,
      moisture: true,
      shapeAccuracy: "Mittel",
      basicColour: "Schwarz",
      heatResistance: null,
      size_h: 144,
      hygiene: true,
      coldResistance: true,
      size_l: 122,
      mechanicalForceType: "dynamisch",
      mechanicalForceIntensity: "Mittel",
      surface: null,
      visiblePart: true,
      uvResistance: true,
      material: "Metall"
    }
  }
  // {
  //   name: "Third Best Part",
  //   values: {
  //     price: 20,
  //     demand: 1003,
  //     minOrderQuantity: 1001,
  //     supplyLeadTime: "within 90 days",
  //     qualification: true,
  //     size_l: 120,
  //     size_w: 9000,
  //     size_h: 201,
  //     material: "Grey cast iron",
  //     partVisible: true,
  //     surfaceQuality: "smooth",
  //     tolerances: "0.1 mm",
  //     color: "unicolor",
  //     heatResistance: true,
  //     coldResistance: false
  //   }
  // }
];

// blackboxes
// should return a number between 0 and 1

// Econ score blackoxes //

// Bauteilkomplexität
function bb_econ_complexity(values) {
  var propertyValue = values.complexity;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Gering":
      return 0.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 1.0;
    default:
      return null;
  }
}
// Derzeitige / alte Lieferzeiten
function bb_econ_supplyLeadTime(values) {
  var propertyValue = values.supplyLeadTime;

  if (propertyValue === null) return null;

  switch (true) {
    case propertyValue <= 7:
      return 0.0;
    case propertyValue <= 30:
      return 0.5;
    case propertyValue > 30:
      return 1.0;
    default:
      return null;
  }
}
// Derzeitige / alte Stückkosten
function bb_econ_partPrice(values) {
  var propertyValue = values.partPrice;

  if (propertyValue === null) return null;

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
      return null;
  }
}
// Derzeitige Mindestabnahmemenge
function bb_econ_minOrderQuantity(values) {
  var propertyValue = values.minOrderQuantity;

  if (propertyValue === null) return null;

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
      return null;
  }
}
// Frequenz
function bb_econ_frequency(values) {
  var propertyValue = values.frequency;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Jährlich":
      return 0.8;
    case "Einmalig":
      return 1.0;
    default:
      return null;
  }
}
// Herkömmliche Fertigung
function bb_econ_traditionalManufacturing(values) {
  var propertyValue = values.traditionalManufacturing;

  if (propertyValue === null) return null;

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
      return null;
  }
}
// Sicherheitsrelevanz
function bb_econ_safetyRelevance(values) {
  var propertyValue = values.safetyRelevance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Stückzahl
function bb_econ_quantity(values) {
  var propertyValue = values.quantity;

  if (propertyValue === null) return null;

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
      return null;
  }
}
// Verfügbarkeitssteigerung möglich um
function bb_econ_availabilityImprovement(values) {
  var propertyValue = values.availabilityImprovement;

  if (propertyValue === null) return null;

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
      return null;
  }
}

// Tech score blackoxes //

// Außenbereich?
function bb_tech_outsideArea(values) {
  var propertyValue = values.outsideArea;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Innenbereich":
      return 1.0;
    case "Außenbereich":
      return 0.5;
    default:
      return null;
  }
}
// Brandschutzanforderungen
function bb_tech_fireSafety(values) {
  var propertyValue = values.fireSafety;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Größe (Länge, Breite, Höhe)
function bb_tech_size(values) {
  var propertyValue_l = values.size_l;
  var propertyValue_b = values.size_b;
  var propertyValue_h = values.size_h;

  if (
    propertyValue_l === null ||
    propertyValue_b === null ||
    values.size_h === null
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
      return null;
  }
}
// Chemische Beständigkeit
function bb_tech_chemicalResistance(values) {
  var propertyValue = values.chemicalResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Ein- oder mehrfarbig
function bb_tech_uniColor(values) {
  var propertyValue = values.uniColor;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "unicolor":
      return 1.0;
    case "multi color":
      return 0.4;
    default:
      return null;
  }
}
// Elektrisch - isolierend
function bb_tech_electricIsolation(values) {
  var propertyValue = values.electricIsolation;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Elektrisch - leitend
function bb_tech_electroconductive(values) {
  var propertyValue = values.electroconductive;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Feuchtigkeit
function bb_tech_moisture(values) {
  var propertyValue = values.moisture;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Formgenauigkeit
function bb_tech_shapeAccuracy(values) {
  var propertyValue = values.shapeAccuracy;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Gering":
      return 1.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 0.0;
    default:
      return null;
  }
}
// Grundfarbe
function bb_tech_basicColour(values) {
  var propertyValue = values.basicColour;

  if (propertyValue === null) return null;

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
      return null;
  }
}
// Hitzebeständigkeit
function bb_tech_heatResistance(values) {
  var propertyValue = values.heatResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Hygiene
function bb_tech_hygiene(values) {
  var propertyValue = values.hygene;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Kältebeständigkeit
function bb_tech_coldResistance(values) {
  var propertyValue = values.coldResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Mechanisch (Art)
function bb_tech_mechanicalForceType(values) {
  var propertyValue = values.mechanicalForceType;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "statisch":
      return 1.0;
    case "dynamisch":
      return 0.5;
    default:
      return null;
  }
}
// Mechanisch (Intensität)
function bb_tech_mechanicalForceIntensity(values) {
  var propertyValue = values.mechanicalForceIntensity;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Gering":
      return 1.0;
    case "Mittel":
      return 0.5;
    case "Hoch":
      return 0.0;
    default:
      return null;
  }
}
// Oberfläche
function bb_tech_surface(values) {
  var propertyValue = values.surface;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Rau":
      return 1.0;
    case "Normal":
      return 0.5;
    case "Glatt/Glänzend":
      return 0.0;
    default:
      return null;
  }
}
// Originalwerkstoff
// function bb_tech_originalMaterial(values) {
//   var propertyValue = values.originalMaterial;

//   if (propertyValue === null) return null;

//   switch (propertyValue) {
//     case "ABS":
//     case "PA6":
//     case "PA11":
//     case "PA12":
//     case "TPE":
//     case "AISI 304":
//       return 1.0;
//     case "PA6 + 30%GF":
//       return 0.8;
//     case "AISI 302":
//     case "PA66":
//     case "PA66 + 30%GF":
//     case "POM":
//     case "Neoprene":
//       return 0.5;
//     case "Grey cast iron":
//       return 0.3;
//     default:
//       return 0.0;
//   }
// }
// Sichtteil
function bb_tech_visiblePart(values) {
  var propertyValue = values.visiblePart;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// UV-Beständigkeit
function bb_tech_uvResistance(values) {
  var propertyValue = values.uvResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Werkstoffklasse
function bb_tech_material(values) {
  var propertyValue = values.material;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case "Kunstoff":
      return 1.0;
    case "Metall":
      return 1.0;
    case "Sonstiges":
      return 0.0;
    default:
      return null;
  }
}

// scores
function economical(values) {
  var score_econ = 0;

  var blackboxes_econ = [
    bb_econ_complexity,
    bb_econ_supplyLeadTime,
    bb_econ_partPrice,
    bb_econ_minOrderQuantity,
    bb_econ_frequency,
    bb_econ_traditionalManufacturing,
    bb_econ_safetyRelevance,
    bb_econ_quantity,
    bb_econ_availabilityImprovement
  ];

  var countNull = 0;
  var bbRes;
  for (var i = 0; i < blackboxes_econ.length; i++) {
    bbRes = blackboxes_econ[i](values);
    if (bbRes === null) countNull++;
    else score_econ += blackboxes_econ[i](values);
  }

  return score_econ / (blackboxes_econ.length - countNull);
}
function technological(values) {
  //  return getEnumValue(values, "enum");
  var score_tech = 0;

  var blackboxes_tech = [
    bb_tech_outsideArea,
    bb_tech_fireSafety,
    bb_tech_size,
    bb_tech_chemicalResistance,
    bb_tech_uniColor,
    bb_tech_electricIsolation,
    bb_tech_electroconductive,
    bb_tech_moisture,
    bb_tech_shapeAccuracy,
    bb_tech_basicColour,
    bb_tech_heatResistance,
    bb_tech_hygiene,
    bb_tech_coldResistance,
    bb_tech_mechanicalForceType,
    bb_tech_mechanicalForceIntensity,
    bb_tech_surface,
    // bb_tech_originalMaterial,
    bb_tech_visiblePart,
    bb_tech_uvResistance,
    bb_tech_material
  ];

  const weights_tech = {
    bb_tech_outsideArea: 10,
    bb_tech_fireSafety: 5,
    bb_tech_size: 100,
    bb_tech_chemicalResistance: 20,
    bb_tech_uniColor: 1,
    bb_tech_electricIsolation: 1,
    bb_tech_electroconductive: 1,
    bb_tech_moisture: 1,
    bb_tech_shapeAccuracy: 1,
    bb_tech_basicColour: 1,
    bb_tech_heatResistance: 1,
    bb_tech_hygiene: 1,
    bb_tech_coldResistance: 1,
    bb_tech_mechanicalForceType: 1,
    bb_tech_mechanicalForceIntensity: 1,
    bb_tech_surface: 1,
    // bb_tech_originalMaterial,
    bb_tech_visiblePart: 1,
    bb_tech_uvResistance: 1,
    bb_tech_material: 1
  };

  var countNull = 0;
  var bbRes;
  for (var i = 0; i < blackboxes_tech.length; i++) {
    bbRes = blackboxes_tech[i](values);
    if (bbRes === null) countNull++;
    else score_tech += blackboxes_tech[i](values);
  }

  return score_tech / (blackboxes_tech.length - countNull);
}

function technological_weighted(values) {
  const blackboxes = [
    // bb_tech_outsideArea
    { weight: 0.5, id: "uuid" },
    // bb_tech_fireSafety
    { weight: 0.5, id: "uuid" },
    //bb_tech_size
    { weight: 10, id: "uuid" }
  ];

  let score = 0;
  let weightsum = 0;
  for (const { id, weight } of blackboxes) {
    const value = results[id];
    if (value !== null) {
      score += weight * value;
      weightsum += weight;
    }
  }
  return score / weightsum;
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
