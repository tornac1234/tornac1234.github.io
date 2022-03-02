const data_input = document.getElementById("data_input");
const data_output = document.getElementById("data_output");
const fix_button = document.getElementById("fix_button");
const logger_p = document.getElementById("logger_p");

const errorColor = "#ff0000";
const successColor = "#1ba327";
const neutralColor = "#000000";

fix_button.onclick = () => {
  let input_text = data_input.value;
  data_output.value = "";
  try {
    let jsoned = JSON.parse(input_text);
    log("Fixing file ...", neutralColor);
    let [fixedText, error] = fixJson(jsoned);
    if (error) {
      log(`Encountered an error: ${error}`, errorColor);
      return;
    }
    data_output.value = fixedText;
    log(
      "Successfully fixed file, now copy-paste this text inside your <u>WorldData.json</u> and restart the server.",
      successColor
    );
  } catch (error) {
    log("You need to enter a valid JSON text", errorColor);
  }
};

function fixJson(jsonText) {
  let data, error;
  try {
    let modulesObject = jsonText["InventoryData"]["Modules"];
    let itemIds = [];
    for (let i = 0; i < modulesObject.length; i++) {
      let entry = modulesObject[i];
      let itemId = entry["ItemId"];
      if (!itemId) {
        throw Error("Couldn't find ItemId field");
      }
      console.log(itemId);
      if (itemIds.includes(itemId)) {
        new_id = create_UUID();
        modulesObject[i]["ItemId"] = new_id;
        console.log(`Created new ItemId: ${new_id}`);
      }
      itemIds += itemId;
    }
    data = JSON.stringify(jsonText);
  } catch (error2) {
    error = "Furnished file isn't a valid WorldData, please enter a valid one";
    console.error(`Full error is : ${error2}`);
  }

  return [data, error];
}

// from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

function log(text, color) {
  logger_p.innerHTML = text;
  logger_p.style.color = color;
}
