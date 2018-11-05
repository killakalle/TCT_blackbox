const variables

// blackboxes for Bambus server
// should return a number between 0 and 1

// Econ score blackoxes //

function bb_econ_stueckzahl(values) {
  let propertyValue = variables.custom.stueckzahl;

  if (propertyValue === null) return null;

  switch (true) {
    case propertyValue <= 10:
      return 1;
    case propertyValue <= 100:
      return 0.7;
    case propertyValue <= 500:
      return 0.5;
    case propertyValue <= 1000:
      return 0.3;
    case propertyValue > 1000:
      return 0;
    default:
      return null;
  }
}

function bb_econ_stueckkosten(values) {
  let propertyValue = variables.custom.stueckkosten;

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
function bb_econ_mindestbestellmenge(values) {
  let propertyValue = variables.custom.mindestbestellmenge;

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

function bb_econ_qualifizierung(values) {
  let propertyValue = variables.custom.qualifizierung;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_econ_lieferzeit(values) {
  const choices = {
    in3Tagen: "6eee7497-a73b-4039-aee7-480990bb5801",
    in7Tagen: "b8a106bf-fc0f-40e7-a337-907a801a9852",
    in14Tagen: "6ab9de5b-68dd-4e61-8a4f-635235998770",
    in30Tagen: "5b3cbe49-5fbb-43c7-bad1-3ef4e1951d0c",
    in90Tagen: "6b6929d7-b191-4dd6-b28b-6999d1be1c46",
    derzeitNichtVerfuegbar: "7e54ddcf-f921-464f-aa9d-29d631ec6ddd"
  };

  let propertyValue = variables.custom.lieferzeit;
  
  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.in3Tagen:
      return 0;
    case choices.in7Tagen:
      return 0.25;
    case choices.in14Tagen:
      return 0.5;
    case choices.in30Tagen:
      return 0.77;
    case choices.in90Tagen:
      return 0.88;
    case choices.derzeitNichtVerfuegbar:
      return 0.1;
    default:
      return null;
  }
}



// Tech score blackoxes //

function bb_tech_kaeltebestaendigkeit(values) {
  let propertyValue = variables.custom.kaeltebestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_tech_farbe(values) {
  const choices = {
    einfarbig: "5bb7d3a8-9cf7-406d-b023-80138bce1985",
    mehrfarbig: "e499df01-e1d5-4735-957b-21070fcbef37"
  };

  let propertyValue = variables.custom.farbe;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.einfarbig:
      return 1.0;
    case choices.mehrfarbig:
      return 0.4;
    default:
      return null;
  }
}

function bb_tech_hitzebestaendigkeit(values) {
  let propertyValue = variables.custom.hitzebestaendigkeit;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

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
    case size >= 54872000:
      return 0;
    default:
      return null;
  }
}
function bb_tech_material(values) {
  const choices = {
    ABS: "b9240c64-ce39-4d6c-8d4a-f8ef3005c41c",
    AISI302: "4374ff62-dc13-43a8-86f6-951394327781",
    AISI304: "8a2b85fb-e38a-4b75-82af-fd04e79b6c04",
    Gusseisen: "f2c5328d-4cbb-4c07-ac1e-5d130fc9bba6",
    Neopren: "886e89b3-5055-4378-b696-5f005defe778",
    PA11: "f76c129f-323d-465d-957a-e83922543f11",
    PA12: "705090e9-ab1a-4621-a54d-6cd1862b535d",
    PA6: "17975359-c11c-49a9-b9a5-d1f531194eb7",
    PA6_30GF: "8dd94c10-2536-4a36-adcd-b4858d5c6ce8",
    PA66: "8e64b0f5-088a-4491-8450-6ab73d8d74d5",
    PA66_30GF: "94641168-50c4-4948-82c8-0e9e81ffd372",
    POM: "df595e18-d617-404a-a80a-e2cb47e371b5",
    TPE: "4ade9d54-d0cd-4ff4-936c-a01ab7465400"
  };
  
  let propertyValue = variables.custom.material;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.ABS:
    case choices.PA6:
    case choices.PA11:
    case choices.PA12:
    case choices.TPE:
    case choices.AISI304:
      return 1;
    case choices.PA6_30GF:
      return 0.8;
    case choices.AISI302:
    case choices.PA66:
    case choices.PA66_30GF:
    case choices.POM:
    case choices.Neopren:
      return 0.5;
    case choices.Gusseisen:
      return 0.3;
    default:
      return null;
  }
}
function bb_tech_sichtteil(values) {
  let propertyValue = variables.custom.sichtteil;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_tech_toleranz(values) {
  const choices = {
    "kleiner0_1mm": "46b21f19-fa8d-4da8-8d47-cddd8133cef5",
    "tl0_1mm": "c0207834-0b4b-4289-96d7-3d1955d2ed71",
    "tl0_2mm": "f1077315-4498-4f0d-9427-d933882ce9e6",
    "tl0_3mm": "d2796029-8ef8-45d8-a7ac-0652e328ee66",
    "tl0_4mm": "dc751a94-d70a-4181-b767-1eb558b080cb",
    "tl0_5mm": "2f6f3c77-067b-4e19-afb0-cf23934e0b58",
    "groesser0_5mm": "e6a21386-0f5e-4f8e-93ef-6a32ad958ee1"
  };
  
  let propertyValue = variables.custom.toleranz;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.kleiner0_1mm:
      return 0.3;
    case choices.tl0_1mm:
      return 0.5;
    case choices.tl0_2mm:
      return 0.6;
    case choices.tl0_3mm:
      return 0.7;
    case choices.tl0_4mm:
      return 0.8;
    case choices.tl0_5mm:
      return 0.9;
    case choices.groesser0_5mm:
      return 1;
    default:
      return null;
  }
}
function bb_tech_oberflaechenbeschaffenheit(values) {
  const choices = {
    Rau: "b1913e06-2a33-4fb1-993e-15921434b3e0",
    Normal: "e299ad9c-1b64-450f-860c-a8e3d1c0dbf4",
    GlattGlaenzend: "eee8f9eb-75f1-4019-9d60-7d1a7cbcddb9"
  };

  let propertyValue = variables.custom.oberflaechenbeschaffenheit;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.Rau:
      return 1.0;
    case choices.Normal:
      return 0.5;
    case choices.GlattGlaenzend:
      return 0.0;
    default:
      return null;
  }
}

function bb_tech_formgenauigkeit(values) {
  const choices = {
    Gering: "57ebd841-b7cd-4bf6-8b61-ac5a67f3da8f",
    Mittel: "8a3dff90-67b2-4bcb-aea2-54e094b704d8",
    Hoch: "bd3d125c-5a2c-4bb7-b2cc-ebcbb45d882b"
  };

  let propertyValue = variables.custom.oberflaechenbeschaffenheit;

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

// scores

function economical_weighted(values) {
  const blackboxes = [
    { weight: 0.8, id: "uuid" }, // Stückzahl
    { weight: 1, id: "uuid" }, // Stückkosten
    { weight: 0.3, id: "uuid" }, // Minindestbestellmenge
    { weight: 0.5, id: "uuid" }, // Qualifizierung
    { weight: 0.2, id: "uuid" }, // Lieferzeit
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
    "result": result,
    "certainty": certainty,
    "name": "Econ Score"
  };
}


function technological_weighted(values) {
  const blackboxes = [
    { weight: 0.3, id: "uuid" }, // Kältebeständigkeit
    { weight: 0.3, id: "uuid" }, // Farbe
    { weight: 0.5, id: "uuid" }, // Hitzebeständigkeit
    { weight: 0.9, id: "uuid" }, // Größe
    { weight: 1, id: "uuid" }, // Material
    { weight: 0.6, id: "uuid" }, // Sichtteil
    { weight: 0.8, id: "uuid" }, // toleranz
    { weight: 0.6, id: "uuid" }, // Oberflächenbeschaffenheit
    { weight: 0.5, id: "uuid" }, // Formgenauigkeit
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
    "result": result,
    "certainty": certainty,
    "name": "Tech Score"
  };
}