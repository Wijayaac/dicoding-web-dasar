const inputName = document.getElementById("input-name");
const inputCaptcha = document.getElementById("input-captcha");
const inputCopy = document.getElementById("input-copy");
const inputPaste = document.getElementById("input-paste");

const totalMaxChar = inputName.maxLength;
const labelCharLeft = document.getElementById("character-left");
const labelCounter = document.getElementById("character-count");

const submitButton = document.getElementById("submit-button");

// on load
document.addEventListener("DOMContentLoaded", () => {
  labelCharLeft.innerText = inputName.maxLength;
  labelCounter.style.visibility = "hidden";
});

// on input
inputName.addEventListener("input", () => {
  let totalChar = inputName.value.length;
  console.log(totalChar, totalMaxChar);

  let totalLeftChar = totalMaxChar - totalChar;

  labelCharLeft.innerText = totalLeftChar;

  if (totalLeftChar == 0) labelCharLeft.innerText = "batas maksimal tercapai";
  else if (totalLeftChar <= 5) labelCounter.style.color = "red";
  else labelCounter.style.color = "black";
});

// on focus
inputName.addEventListener("focus", () => {
  labelCounter.style.visibility = "visible";
});

// on blur
inputName.addEventListener("blur", () => {
  labelCounter.style.visibility = "hidden";
});

// on change
inputCaptcha.addEventListener("change", (e) => {
  let captchaVal = inputCaptcha.value;

  if (captchaVal == "PRNU") {
    alert("selamat! captcha sudah sesuai");
    submitButton.removeAttribute("disabled");
  } else {
    alert("Captcha belum tepat");
    submitButton.setAttribute("disabled", "");
  }

  e.preventDefault();
});

// on copy
inputCopy.addEventListener("copy", () => {
  alert("Anda telah mengcopy sesuatu...");
});

// on paste
inputPaste.addEventListener("paste", () => {
  alert("Anda telah mempaste teks...");
});
