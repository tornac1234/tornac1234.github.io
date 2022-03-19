const ipField = document.getElementById("IP");

fetch("https://api.ipify.org?format=json")
  .then((resp) => resp.json())
  .then((data) => {
    ipField.innerHTML = data["ip"];
  })
  .catch((err) => {
    ipField.innerHTML =
      'Couldn\'t find IP, please find it on <a href="https://api.ipify.org/">here</a>';
  });
