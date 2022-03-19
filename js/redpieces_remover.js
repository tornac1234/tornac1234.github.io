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
      "Successfully fixed file, now copy-paste this text inside your <u>BaseData.json</u> and restart the server.",
      successColor,
    );
  } catch (error) {
    log("You need to enter a valid JSON text", errorColor);
  }
};

function fixJson(jsonData) {
  let data, error;
  try {
    jsonData["PartiallyConstructedPieces"] = [];
    data = JSON.stringify(jsonData);
  } catch (error2) {
    error = "Furnished file isn't a valid WorldData, please enter a valid one";
    console.error(`Full error is : ${error2}`);
  }

  return [data, error];
}

function log(text, color) {
  logger_p.innerHTML = text;
  logger_p.style.color = color;
}
