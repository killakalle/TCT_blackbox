const variables

// blackboxes
// should return a number between 0 and 1

// Econ score blackoxes //

function bb_econ_annualDemand(values) {
  let propertyValue = variables.custom.annualDemand;

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

function bb_econ_currentPartPrice(values) {
  let propertyValue = variables.custom.currentPartPrice;

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
function bb_econ_minOrderQuantity(values) {
  let propertyValue = variables.custom.minOrderQuantity;

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

function bb_econ_qualificationNeeded(values) {
  let propertyValue = variables.custom.qualificationNeeded;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_econ_supplyLeadTime(values) {
  const choices = {
    "within3Days": "6eee7497-a73b-4039-aee7-480990bb5801",
    "within7Days": "b8a106bf-fc0f-40e7-a337-907a801a9852",
    "within14Days": "6ab9de5b-68dd-4e61-8a4f-635235998770",
    "within30Days": "5b3cbe49-5fbb-43c7-bad1-3ef4e1951d0c",
    "within90Days": "6b6929d7-b191-4dd6-b28b-6999d1be1c46",
    "currentlyNotAvailable": "7e54ddcf-f921-464f-aa9d-29d631ec6ddd"
  };

  let propertyValue = variables.custom.supplyLeadTime;
  
  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.within3Days:
      return 0;
    case choices.within7Days:
      return 0.25;
    case choices.within14Days:
      return 0.5;
    case choices.within30Days:
      return 0.77;
    case choices.within90Days:
      return 0.88;
    case choices.currentlyNotAvailable:
      return 0.1;
    default:
      return null;
  }
}



// Tech score blackoxes //

function bb_tech_coldResistance(values) {
  let propertyValue = variables.custom.coldResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_tech_color(values) {
  const choices = {
    unicolor: "5bb7d3a8-9cf7-406d-b023-80138bce1985",
    multicolor: "e499df01-e1d5-4735-957b-21070fcbef37"
  };

  let propertyValue = variables.custom.color;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.unicolor:
      return 1.0;
    case choices.multicolor:
      return 0.4;
    default:
      return null;
  }
}

function bb_tech_heatResistance(values) {
  let propertyValue = variables.custom.heatResistance;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_tech_size(values) {
  let propertyValue_l = variables.custom.length;
  let propertyValue_b = variables.custom.width;
  let propertyValue_h = variables.custom.height;

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
function bb_tech_material(values) {
  const choices = {
    ABS: "b9240c64-ce39-4d6c-8d4a-f8ef3005c41c",
    AISI302: "4374ff62-dc13-43a8-86f6-951394327781",
    AISI304: "8a2b85fb-e38a-4b75-82af-fd04e79b6c04",
    Greycastiron: "f2c5328d-4cbb-4c07-ac1e-5d130fc9bba6",
    Neoprene: "886e89b3-5055-4378-b696-5f005defe778",
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
    case choices.Neoprene:
      return 0.5;
    case choices.Greycastiron:
      return 0.3;
    default:
      return null;
  }
}
function bb_tech_partVisible(values) {
  let propertyValue = variables.custom.partVisible;

  if (propertyValue === null) return null;

  if (propertyValue === true) return 0.35;
  else return 1.0;
}

function bb_tech_requiredTolerances(values) {
  const choices = {
    lessThan0_1mm: "46b21f19-fa8d-4da8-8d47-cddd8133cef5",
    tl0_1mm: "c0207834-0b4b-4289-96d7-3d1955d2ed71",
    tl0_2mm: "f1077315-4498-4f0d-9427-d933882ce9e6",
    tl0_3mm: "d2796029-8ef8-45d8-a7ac-0652e328ee66",
    tl0_4mm: "dc751a94-d70a-4181-b767-1eb558b080cb",
    tl0_5mm: "2f6f3c77-067b-4e19-afb0-cf23934e0b58",
    moreThan0_5mm: "e6a21386-0f5e-4f8e-93ef-6a32ad958ee1"
  };
  
  let propertyValue = variables.custom.requiredTolerances;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.lessThan0_1mm:
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
    case choices.moreThan0_5mm:
      return 1;
    default:
      return null;
  }
}
function bb_tech_surfaceQuality(values) {
  const choices = {
    rough: "b1913e06-2a33-4fb1-993e-15921434b3e0",
    medium: "e299ad9c-1b64-450f-860c-a8e3d1c0dbf4",
    smooth: "eee8f9eb-75f1-4019-9d60-7d1a7cbcddb9"
  };

  let propertyValue = variables.custom.surfaceQuality;

  if (propertyValue === null) return null;

  switch (propertyValue) {
    case choices.rough:
      return 1.0;
    case choices.medium:
      return 0.5;
    case choices.smooth:
      return 0.0;
    default:
      return null;
  }
}

// scores

function economical_weighted(values) {
  const blackboxes = [
    { weight: 0.8, id: "4a8f8189-3fbd-4dc0-a21f-399e23368657" }, // Annual Demand
    { weight: 1, id: "d9e2bba3-445c-4b05-9410-7a8442215758" }, // Current Part Price
    { weight: 0.3, id: "898229fa-162a-4f7f-a43f-a471b14fa266" }, // Min Order Quantity
    { weight: 0.5, id: "9735bed1-d356-421b-9d1d-43f9ddfbfc53" }, // Qualification Needed?
    { weight: 0.2, id: "3de0d565-cbc5-41a4-9c4e-057658ea4d8d" }, // Supply Lead Time
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
    { weight: 0.3, id: "e7e4eaff-0349-4e28-abf5-80e618fbb449" }, // Cold Resistance
    { weight: 0.3, id: "e571a6cd-ed0f-4f05-b877-4f8ccb7768d6" }, // Color
    { weight: 0.5, id: "cd3454ad-de55-4b84-937d-223fc8019d6e" }, // Heat resistance
    { weight: 0.9, id: "9f169e01-d5bd-4e60-86f5-682aaa3da1c9" }, // Size
    { weight: 1, id: "7f9cb4e9-a562-455a-b935-3300583c8cc4" }, // Material
    { weight: 0.6, id: "8dccf1e6-c271-4d06-a7db-2bc3ad33ce86" }, // Part Visible
    { weight: 0.8, id: "a9eb02b9-80aa-4b65-b2b8-cc52fb5165b8" }, // Required Tolerances
    { weight: 0.6, id: "4a9816c6-6329-4be6-8cf1-92db0e5ab83e" }, // Surface Quality
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