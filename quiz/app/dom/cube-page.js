// Resize image size
const imgElm = document.getElementById("image");

imgElm.setAttribute("width", 300);
imgElm.setAttribute("height", 200);

// Disabled Coming Soon button
const buttonElms = document.querySelectorAll(".button");
const playBtnParrent = buttonElms[3];
const playButton = playBtnParrent.firstElementChild;

playButton.setAttribute("disabled", "disabled");

// Manipulate button border
buttonElms.forEach((elm) => {
  let buttonElm = elm.querySelector("button");
  buttonElm.style.borderRadius = "4px";
});

// Link text manipulation
const dicodingLInk = document.getElementById("dicoding-link");
const googleLink = document.getElementById("google-link");

dicodingLInk.innerHTML = "<b><i>Belajar Programming di Dicoding</i></b>";
googleLink.innerHTML = "<b><i>Mencari Sesuatu di Google</i></b>";
