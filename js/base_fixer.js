const data_input = document.getElementById("data_input");
const data_output = document.getElementById("data_output");
const read_button = document.getElementById("read_button");
const modify_button = document.getElementById("modify_button");
const logger_p = document.getElementById("logger_p");
const logger_p_2 = document.getElementById("logger_p_2");

const errorColor = "#ff0000";
const successColor = "#1ba327";
const neutralColor = "#000000";
const remarkColor = "#ff5100";

var partialPieces = [];
var loadedPieces = {};

var modificationApplied = false;

read_button.onclick = () => {
  let input_text = data_input.value;
  data_output.value = "";

  try {
    let jsoned = JSON.parse(input_text);
    log("Reading content ...", neutralColor);
    loadedPieces = {};

    toolUI.innerHTML = "";
    let [fixedText, error] = loadJson(jsoned);
    if (error) {
      log(`Encountered an error: ${error}`, errorColor);
      return;
    }
    data_output.value = "";
    setModificationApplied(false);
    log(
      `Successfully read file, now you can modify the vehicles (if any) and then press <u>APPLY MODIFICATIONS</u> when you're done.`,
      successColor,
    );
  } catch (error) {
    log("You need to enter a valid JSON text", errorColor);
    console.error(`Full error is : ${error}`);
  }
};

modify_button.onclick = () => {
  data_output.value = "";
  try {
    let piecesList = Object.values(loadedPieces);

    let jsoned = {
      PartiallyConstructedPieces: partialPieces,
      CompletedBasePieceHistory: piecesList,
    };

    data_output.value = JSON.stringify(jsoned);
    setModificationApplied(false);
    log(
      "Successfully fixed file, now copy-paste this text inside your <u>BaseData.json</u> and restart the server.",
      successColor,
    );
  } catch (error) {
    log("You need to enter a valid JSON text", errorColor);
  }
};

function updateUI() {
  toolUI.innerHTML = "<dl>";
  let keys = Object.keys(loadedPieces);
  for (let i = 0; i < keys.length; i++) {
    const loadedPiece = loadedPieces[keys[i]];
    toolUI.innerHTML += `<dt>${loadedPiece["TechType"]}</dt>`;

    let id = loadedPiece["Id"];
    let name = `Id: ${id}, `;
    const position = loadedPiece["ItemPosition"];

    toolUI.innerHTML += `<dd>${name}Position:
    ${numberInput(`pos_x_${id}`, "x:", position["X"], 3)}
    ${numberInput(`pos_y_${id}`, "y:", position["Y"], 3)}
    ${numberInput(`pos_z_${id}`, "z:", position["Z"], 3)}
      
      <button id="update_pos_${id}" onclick="updatePosition('${id}')">Update position</button>
      <button id="remove_${id}" onclick="deletePiece('${id}')">Delete</button></dd>`;
  }
  toolUI.innerHTML += "</dl>";
}

function numberInput(id, text, default_value, to_fixed) {
  return `<label for="${id}">${text}</label>
    <input type="number" id="${id}" step=".001" size="9" value="${default_value.toFixed(
    to_fixed,
  )}" />`;
}

function loadJson(json) {
  let data, error;
  try {
    partialPieces = json["PartiallyConstructedPieces"];
    const piecesList = json["CompletedBasePieceHistory"];
    for (const piece of piecesList) {
      loadPiece(piece);
    }
    updateUI();
    loadedJson = JSON.parse(JSON.stringify(json));
  } catch (error2) {
    error = "Furnished file isn't a valid BaseData, please enter a valid one";
    console.error(`Full error is : ${error2}`);
  }

  return [data, error];
}

function loadPiece(piece) {
  loadedPieces[piece["Id"]] = piece;
}

function updatePosition(pieceId) {
  let xValue = parseFloat(document.getElementById(`pos_x_${pieceId}`).value);
  let yValue = parseFloat(document.getElementById(`pos_y_${pieceId}`).value);
  let zValue = parseFloat(document.getElementById(`pos_z_${pieceId}`).value);

  loadedPieces[pieceId]["ItemPosition"] = { X: xValue, Y: yValue, Z: zValue };
  setModificationApplied(true);
}

function deletePiece(pieceId) {
  console.log(pieceId);
  delete loadedPieces[pieceId];

  updateUI();
  setModificationApplied(true);
}

function log(text, color) {
  logger_p.innerHTML = text;
  logger_p.style.color = color;
}

function log2(text, color) {
  logger_p_2.innerHTML = text;
  logger_p_2.style.color = color;
}

function setModificationApplied(state) {
  modificationApplied = state;
  if (state) {
    log2(
      "Vehicles were edited, press <u>APPLY MODIFICATIONS</u> to generate the new version of <u>WorldData.json</u>",
      remarkColor,
    );
  } else {
    log2("", neutralColor);
  }
}
