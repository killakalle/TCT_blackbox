const variables

const parts = [
  {
    name: "Best Part",
    values: {
      complexity: "Gering",
      supplyLeadTime: 25,
      partPrice: 150,
      minOrderstueckzahl: 100,
      frequency: "Jährlich",
      herkoemmlicheFertigung: "Spritzgießen",
      sicherheitsrelevanz: true,
      stueckzahl: 250,
      verfuegbarkeitssteigerung: "sechs Monate",
      outsideArea: "Innenbereich",
      brandschutzanforderungen: false,
      size_b: 25,
      chemischeBestaendigkeit: true,
      einOderMehrfarbig: "mehrfarbig",
      elektrischIsolierend: true,
      elektrischLeitend: null,
      feuchtigkeit: null,
      formgenauigkeit: "Mittel",
      grundfarbe: "Schwarz",
      hitzebestaendigkeit: null,
      size_h: 144,
      hygiene: true,
      kaeltebestaendigkeit: true,
      size_l: 122,
      mechanischArt: "dynamisch",
      mechanischIntensitaet: "Mittel",
      oberflaeche: "Glatt/Glänzend",
      sichtteil: true,
      uvBestaendigkeit: true,
      werkstoffklasse: "Metall"
    }
  },
  {
    name: "Second Part",
    values: {
      complexity: "Mittel",
      supplyLeadTime: 1225,
      partPrice: 1150,
      minOrderstueckzahl: 100,
      frequency: "Jährlich",
      herkoemmlicheFertigung: "Spritzgießen",
      sicherheitsrelevanz: true,
      stueckzahl: 250,
      verfuegbarkeitssteigerung: "sechs Monate",
      outsideArea: "Innenbereich",
      brandschutzanforderungen: true,
      size_b: 225,
      chemischeBestaendigkeit: true,
      einOderMehrfarbig: "mehrfarbig",
      elektrischIsolierend: true,
      elektrischLeitend: null,
      feuchtigkeit: true,
      formgenauigkeit: "Mittel",
      grundfarbe: "Schwarz",
      hitzebestaendigkeit: null,
      size_h: 144,
      hygiene: true,
      kaeltebestaendigkeit: true,
      size_l: 122,
      mechanischArt: "dynamisch",
      mechanischIntensitaet: "Mittel",
      oberflaeche: null,
      sichtteil: true,
      uvBestaendigkeit: true,
      werkstoffklasse: "Metall"
    }
  }
  // {
  //   name: "Third Best Part",
  //   values: {
  //     price: 20,
  //     demand: 1003,
  //     minOrderstueckzahl: 1001,
  //     supplyLeadTime: "within 90 days",
  //     qualification: true,
  //     size_l: 120,
  //     size_w: 9000,
  //     size_h: 201,
  //     werkstoffklasse: "Grey cast iron",
  //     partVisible: true,
  //     oberflaecheQuality: "smooth",
  //     tolerances: "0.1 mm",
  //     color: "einOderMehrfarbig",
  //     hitzebestaendigkeit: true,
  //     kaeltebestaendigkeit: false
  //   }
  // }
];

// blackboxes
// should return a number between 0 and 1

// Econ score blackoxes //

// Bauteilkomplexität
function bb_econ_bauteilkomplexitaet(values) {
  const choices = { //Bauteilkomplexität
    Gering: "4257b5f9-bbc8-4d8f-acea-2770ef7f4be3",
    Mittel: "b9def269-7811-4b04-bb92-35bb0e62d409",
    Hoch: "70594939-e8df-4b92-ab67-5fe94f4f82c9"
  };
  
  let propertyValue = variables.custom.bauteilkomplexitaet;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Gering:
      return 0.0;
    case choices.Mittel:
      return 0.5;
    case choices.Hoch:
      return 1.0;
    default:
      return null;
  }
}
// Derzeitige / alte Lieferzeiten
function bb_econ_derzeitigeAlteLieferzeiten(values) {
  let propertyValue = variables.custom.derzeitigeAlteLieferzeiten;

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
function bb_econ_derzeitigeAlteStueckkosten(values) {
  let propertyValue = variables.custom.derzeitigeAlteStueckkosten;

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
function bb_econ_derzeitigeMindestabnahmemenge(values) {
  let propertyValue = variables.custom.derzeitigeMindestabnahmemenge;

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
function bb_econ_frequenz(values) {
  const choices = {
    Jährlich: "00d92b53-ebf1-4d3f-92f0-9e8cdd0f1cde",
    Einmalig: "ae7270c2-d432-4a46-91ca-3fd5fee8e232"
  };

  let propertyValue = variables.custom.frequenz;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Jährlich:
      return 0.8;
    case choices.Einmalig:
      return 1.0;
    default:
      return null;
  }
}
// Herkömmliche Fertigung
function bb_econ_herkoemmlicheFertigung(values) {
  const choices = {
    Drehen: "746bc852-ed2d-425b-b7be-3955cb1c1e8e",
    Fräsen: "6c3af925-880a-4d33-ab17-495973749244",
    Gießen: "c7df08ab-a2c8-4ddc-b247-42871d21ca0d",
    Spritzgießen: "4d63f587-d988-4cf9-8f6a-819643bae4bc"
  };

  let propertyValue = variables.custom.herkoemmlicheFertigung;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Drehen:
      return 0.3;
    case choices.Fräsen:
      return 0.5;
    case choices.Gießen:
      return 0.8;
    case choices.Spritzgießen:
      return 1.0;
    default:
      return null;
  }
}
// Sicherheitsrelevanz
function bb_econ_sicherheitsrelevanz(values) {
  let propertyValue = variables.custom.sicherheitsrelevanz;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Stückzahl
function bb_econ_stueckzahl(values) {
  let propertyValue = variables.custom.stueckzahl;

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
function bb_econ_verfuegbarkeitssteigerung(values) {
  const choices = {
    "einenMonat": "7a58ee10-eaf8-4021-b9a8-324dde733dad",
    "dreiMonate": "14a9d39a-ef7b-41ff-ac8a-34c56864a554",
    "sechsMonate": "56ab521a-7868-4c64-9a33-8d5bab0a1fc6",
    "einJahr": "314739a2-b47a-4860-80cd-0b8034ec7484"
  };

  let propertyValue = variables.custom.verfuegbarkeitssteigerung;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.einenMonat:
      return 0.0;
    case choices.dreiMonate:
      return 0.5;
    case choices.sechsMonate:
      return 0.7;
    case choices.einJahr:
      return 1.0;
    default:
      return null;
  }
}

// Tech score blackoxes //

// Außenbereich?
function bb_tech_aussenbereich(values) {
  const choices = {
    Innenbereich: "6908f92d-8950-4c6f-b97d-d010962ab799",
    Außenbereich: "c4ee219d-aa17-49a2-9743-bb6f04e44859"
  };
  
  let propertyValue = variables.custom.aussenbereich;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Innenbereich:
      return 1.0;
    case choices.Außenbereich:
      return 0.5;
    default:
      return null;
  }
}
// Brandschutzanforderungen
function bb_tech_brandschutzanforderungen(values) {
  let propertyValue = variables.custom.brandschutzanforderungen;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Größe (Länge, Breite, Höhe)
function bb_tech_groesse(values) {
  let propertyValue_l = variables.custom.laenge;
  let propertyValue_b = variables.custom.breite;
  let propertyValue_h = variables.custom.hoehe;

  if (
    propertyValue_l === null ||
    propertyValue_b === null ||
    propertyValue_h === null
  )
    return null;

  let size;
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
function bb_tech_chemischeBestaendigkeit(values) {
  let propertyValue = variables.custom.chemischeBestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Ein- oder mehrfarbig
function bb_tech_einOderMehrfarbig(values) {
  const choices = {
    Einfarbig: "5bb7d3a8-9cf7-406d-b023-80138bce1985",
    Mehrfarbig: "e499df01-e1d5-4735-957b-21070fcbef37"
  };
  
  let propertyValue = variables.custom.einOderMehrfarbig;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Einfarbig:
      return 1.0;
    case choices.Mehrfarbig:
      return 0.4;
    default:
      return null;
  }
}
// Elektrisch - isolierend
function bb_tech_elektrischIsolierend(values) {
  let propertyValue = variables.custom.elektrischIsolierend;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Elektrisch - leitend
function bb_tech_elektrischLeitend(values) {
  let propertyValue = variables.custom.elektrischLeitend;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Feuchtigkeit
function bb_tech_feuchtigkeit(values) {
  let propertyValue = variables.custom.feuchtigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Formgenauigkeit
function bb_tech_formgenauigkeit(values) {
  const choices = {
    Gering: "57ebd841-b7cd-4bf6-8b61-ac5a67f3da8f",
    Mittel: "8a3dff90-67b2-4bcb-aea2-54e094b704d8",
    Hoch: "bd3d125c-5a2c-4bb7-b2cc-ebcbb45d882b"
  };

  let propertyValue = variables.custom.formgenauigkeit;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Gering:
      return 1.0;
    case choices.Mittel:
      return 0.5;
    case choices.Hoch:
      return 0.0;
    default:
      return null;
  }
}
// Grundfarbe
function bb_tech_grundfarbe(values) {
  const choices = {
    Weiß: "4a1a7376-31ca-40b9-ad0e-58e12da0d4c5",
    Schwarz: "6aeab352-86c6-412b-be95-823be3ff39f9",
    Blau: "b1a4fcc1-5a4c-412e-a7d2-19a81e695fde",
    Rot: "a6a95b8f-d30f-40a6-bad7-79043b3b6890",
    Gelb: "7efdb53a-79ec-4ba9-983b-7b8c6bc057a4",
    Andere: "0940772d-25d7-462e-bfd9-a31ceedf151b"
  };
  
  let propertyValue = variables.custom.grundfarbe;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Weiß:
    case choices.Schwarz:
    case choices.Blau:
    case choices.Rot:
    case choices.Gelb:
      return 1.0;
    case choices.Andere:
      return 0.0;
    default:
      return null;
  }
}
// Hitzebeständigkeit
function bb_tech_hitzebestaendigkeit(values) {
  let propertyValue = variables.custom.hitzebestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Hygiene
function bb_tech_hygiene(values) {
  let propertyValue = variables.custom.hyigene;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Kältebeständigkeit
function bb_tech_kaeltebestaendigkeit(values) {
  let propertyValue = variables.custom.kaeltebestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Mechanisch (Art)
function bb_tech_mechanischArt(values) {
  const choices = {
    Statisch: "5ffeab77-529a-47b5-9c04-19d4961f4213",
    Dynamisch: "bbe5b02d-a2d5-489b-9bac-d4506bb01913"
  };
  
  let propertyValue = variables.custom.mechanischArt;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.statisch:
      return 1.0;
    case choices.dynamisch:
      return 0.5;
    default:
      return null;
  }
}
// Mechanisch (Intensität)
function bb_tech_mechanischIntensitaet(values) {
  const choices = {
    Gering: "20ffe30e-8712-4767-b694-d8ec6966d161",
    Mittel: "7e8873dd-b5a6-4bbb-a43e-9113d41ea311",
    Hoch: "2a561c58-d643-4d7e-810b-68e009ab791d"
  };
  
  let propertyValue = variables.custom.mechanischIntensitaet;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Gering:
      return 1.0;
    case choices.Mittel:
      return 0.5;
    case choices.Hoch:
      return 0.0;
    default:
      return null;
  }
}
// Oberfläche
function bb_tech_oberflaeche(values) {
  const choices = {
    Rau: "b1913e06-2a33-4fb1-993e-15921434b3e0",
    Normal: "e299ad9c-1b64-450f-860c-a8e3d1c0dbf4",
    GlattGlänzend: "eee8f9eb-75f1-4019-9d60-7d1a7cbcddb9"
  };
  
  let propertyValue = variables.custom.oberflaeche;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Rau:
      return 1.0;
    case choices.Normal:
      return 0.5;
    case choices.GlattGlänzend:
      return 0.0;
    default:
      return null;
  }
}
// Originalwerkstoff
// function bb_tech_originalwerkstoffklasse(values) {
//   let propertyValue = variables.custom.originalwerkstoffklasse;

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
function bb_tech_sichtteil(values) {
  let propertyValue = variables.custom.sichtteil;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// UV-Beständigkeit
function bb_tech_uvBestaendigkeit(values) {
  let propertyValue = variables.custom.uvBestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}
// Werkstoffklasse
function bb_tech_werkstoffklasse(values) {
  const choices = {
    Kunstoff: "c51432ae-c89c-4027-9361-1cd383c7fc4e",
    Metall: "62bebdcf-d0c4-4396-ab78-952dda5a57a9",
    Sonstiges: "026055d6-81d2-4f94-b37c-835b7580fa78"
  };
  
  let propertyValue = variables.custom.werkstoffklasse;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Kunstoff:
      return 1.0;
    case choices.Metall:
      return 1.0;
    case choices.Sonstiges:
      return 0.0;
    default:
      return null;
  }
}

// scores
function economical(values) {
  let score_econ = 0;

  let blackboxes_econ = [
    bb_econ_complexity,
    bb_econ_supplyLeadTime,
    bb_econ_partPrice,
    bb_econ_minOrderstueckzahl,
    bb_econ_frequency,
    bb_econ_herkoemmlicheFertigung,
    bb_econ_sicherheitsrelevanz,
    bb_econ_stueckzahl,
    bb_econ_verfuegbarkeitssteigerung
  ];

  let countNull = 0;
  let bbRes;
  for (let i = 0; i < blackboxes_econ.length; i++) {
    bbRes = blackboxes_econ[i](values);
    if (bbRes === null) countNull++;
    else score_econ += blackboxes_econ[i](values);
  }

  return score_econ / (blackboxes_econ.length - countNull);
}
function technological(values) {
  //  return getEnumValue(values, "enum");
  let score_tech = 0;

  let blackboxes_tech = [
    bb_tech_aussenbereich,
    bb_tech_brandschutzanforderungen,
    bb_tech_size,
    bb_tech_chemischeBestaendigkeit,
    bb_tech_einOderMehrfarbig,
    bb_tech_elektrischIsolierend,
    bb_tech_elektrischLeitend,
    bb_tech_feuchtigkeit,
    bb_tech_formgenauigkeit,
    bb_tech_grundfarbe,
    bb_tech_hitzebestaendigkeit,
    bb_tech_hygiene,
    bb_tech_kaeltebestaendigkeit,
    bb_tech_mechanischArt,
    bb_tech_mechanischIntensitaet,
    bb_tech_oberflaeche,
    // bb_tech_originalwerkstoffklasse,
    bb_tech_sichtteil,
    bb_tech_uvBestaendigkeit,
    bb_tech_werkstoffklasse
  ];

  const weights_tech = {
    bb_tech_aussenbereich: 10,
    bb_tech_brandschutzanforderungen: 5,
    bb_tech_size: 100,
    bb_tech_chemischeBestaendigkeit: 20,
    bb_tech_einOderMehrfarbig: 1,
    bb_tech_elektrischIsolierend: 1,
    bb_tech_elektrischLeitend: 1,
    bb_tech_feuchtigkeit: 1,
    bb_tech_formgenauigkeit: 1,
    bb_tech_grundfarbe: 1,
    bb_tech_hitzebestaendigkeit: 1,
    bb_tech_hygiene: 1,
    bb_tech_kaeltebestaendigkeit: 1,
    bb_tech_mechanischArt: 1,
    bb_tech_mechanischIntensitaet: 1,
    bb_tech_oberflaeche: 1,
    // bb_tech_originalwerkstoffklasse,
    bb_tech_sichtteil: 1,
    bb_tech_uvBestaendigkeit: 1,
    bb_tech_werkstoffklasse: 1
  };

  let countNull = 0;
  let bbRes;
  for (let i = 0; i < blackboxes_tech.length; i++) {
    bbRes = blackboxes_tech[i](values);
    if (bbRes === null) countNull++;
    else score_tech += blackboxes_tech[i](values);
  }

  return score_tech / (blackboxes_tech.length - countNull);
}

function economical_weighted(values) {
  const blackboxes = [
    { weight: 0.5, id: "uuid" }, // Bauteilkomplexität
    { weight: 0.5, id: "uuid" }, // Derzeitige / alte Lieferzeiten
    { weight: 0.5, id: "uuid" }, // Derzeitige / alte Stückkosten
    { weight: 0.5, id: "uuid" }, // Derzeitige Mindestabnahmemenge
    { weight: 0, id: "uuid" }, // Frequenz
    { weight: 0.5, id: "uuid" }, // Herkömmliche Fertigung
    { weight: 0.5, id: "uuid" }, // Sicherheitsrelevanz
    { weight: 0.5, id: "uuid" }, // Stückzahl
    { weight: 0.5, id: "uuid" } // Verfügbarkeitssteigerung möglich um
  ];

  let score = 0;
  let weightsum = 0;
  let weighttotal = 0;
  for (const { id, weight } of blackboxes) {
    const value = results[id]; // results will work in AMPI
    if (value !== null) {
      score += weight * value;
      weightsum += weight;
    }
    weighttotal += weight;
  }
  let result = score / weightsum;
  let certainty = weightsum / weighttotal;
  return {
    result: result,
    certainty: certainty,
    name: "Econ"
  };
}

function technological_weighted(values) {
  const blackboxes = [
    { weight: 0.5, id: "uuid" }, // Bauteilkomplexität
    { weight: 0.5, id: "uuid" }, // Derzeitige / alte Lieferzeiten
    { weight: 0.5, id: "uuid" }, // Derzeitige / alte Stückkosten
    { weight: 0.5, id: "uuid" }, // Derzeitige Mindestabnahmemenge
    { weight: 0, id: "uuid" }, // Frequenz
    { weight: 0.5, id: "uuid" }, // Herkömmliche Fertigung
    { weight: 0.5, id: "uuid" }, // Sicherheitsrelevanz
    { weight: 0.5, id: "uuid" }, // Stückzahl
    { weight: 0.5, id: "uuid" }, // Verfügbarkeitssteigerung möglich um
    { weight: 0.5, id: "uuid" }, // Außenbereich?
    { weight: 0.5, id: "uuid" }, // Brandschutzanforderungen
    { weight: 0.5, id: "uuid" }, // Größe
    { weight: 0.5, id: "uuid" }, // Chemische Beständigkeit
    { weight: 0.5, id: "uuid" }, // Ein- oder mehrfarbig
    { weight: 0.5, id: "uuid" }, // Elektrisch - isolierend
    { weight: 0.5, id: "uuid" }, // Elektrisch - leitend
    { weight: 0.5, id: "uuid" }, // Feuchtigkeit
    { weight: 0.5, id: "uuid" }, // Formgenauigkeit
    { weight: 0.5, id: "uuid" }, // Grundfarbe
    { weight: 0.5, id: "uuid" }, // Hitzebeständigkeit
    { weight: 0.5, id: "uuid" }, // Hygiene
    { weight: 0.5, id: "uuid" }, // Kältebeständigkeit
    { weight: 0.5, id: "uuid" }, // Mechanisch (Art)
    { weight: 0.5, id: "uuid" }, // Mechanisch (Intensität)
    { weight: 0.5, id: "uuid" }, // Oberfläche
    // { weight: 0, id: "uuid" }, // Originalwerkstoff
    { weight: 0.5, id: "uuid" }, // Sichtteil
    { weight: 0.5, id: "uuid" }, // UV-Beständigkeit
    { weight: 0.5, id: "uuid" } // Werkstoff
  ];

  let score = 0;
  let weightsum = 0;
  let weighttotal = 0;
  for (const { id, weight } of blackboxes) {
    const value = results[id]; // results will work in AMPI
    if (value !== null) {
      score += weight * value;
      weightsum += weight;
    }
    weighttotal += weight;
  }
  let result = score / weightsum;
  let certainty = weightsum / weighttotal;
  return {
    result: result,
    certainty: certainty,
    name: "Tech"
  };
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
