const data_input = document.getElementById("data_input");
const data_output = document.getElementById("data_output");
const calculate_button = document.getElementById("calculate_button");
const logger_p = document.getElementById("logger_p");
const time_offset_input = document.getElementById("time_offset_input");

const errorColor = "#ff0000";
const successColor = "#1ba327";
const neutralColor = "#000000";
const remarkColor = "#ff5100";

calculate_button.onclick = () => {
  let input_text = data_input.value;
  data_output.value = "";

  let input_time = parseInt(time_offset_input.value);
  if (isNaN(input_time) || input_time <= 0) {
    log("Time is not a valid number (must be > 0)", errorColor);
    return;
  }
  try {
    let jsoned = JSON.parse(input_text);
    log("Modifying file ...", neutralColor);
    let [fixedText, error] = modifyJson(jsoned, input_time);
    if (error) {
      log(`Encountered an error: ${error}`, errorColor);
      return;
    }
    data_output.value = fixedText;
    let remark =
      input_time < 120
        ? `<p style="color: ${remarkColor};">Warning (can be ignored):<br/>We recommend a minimum of 120 seconds (2 minutes) for every player to have the time of spawning before aurora explodes (but it's up to you to pick the right amount of time).</p>`
        : "";
    log(
      `${remark}Successfully modified file, now copy-paste this text inside your <u>WorldData.json</u> and restart the server.`,
      successColor,
    );
  } catch (error) {
    log("You need to enter a valid JSON text", errorColor);
  }
};

function modifyJson(textJson, time) {
  let data, error;
  try {
    let elapsedTime = textJson["GameData"]["StoryTiming"]["ElapsedTime"];
    textJson["GameData"]["StoryTiming"]["AuroraExplosionTime"] =
      elapsedTime + time * 1000;

    data = JSON.stringify(textJson);
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
