const submitAction = document.getElementById("form-data");

submitAction.addEventListener("submit", function (event) {
  const inputName = document.getElementById("input-name").value;
  const inputAddress = document.getElementById("input-address").value;
  const hiddenMessage =
    "Halo " + inputName + " bagaimana cuacanya di " + inputAddress + "?";

  document.getElementById("submit-message").innerText = hiddenMessage;
  event.preventDefault();
});
