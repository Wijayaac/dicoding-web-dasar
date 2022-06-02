document.addEventListener("DOMContentLoaded", () => {
  const inputMaxLength = document.getElementById("input-name").maxLength;

  document.getElementById("character-left").innerText = inputMaxLength;
});
