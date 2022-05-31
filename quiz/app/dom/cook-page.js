// inserting elm to the DOM
const listsElm = document.getElementById("lists");
const listElmTwo = document.getElementById("first");
const listElmLast = document.createElement("li");
const listElmBefore = document.createElement("li");

listElmLast.innerText = "Selamat menikmati!";
listElmBefore.innerText = "Hidupkan kompor.";

listsElm.appendChild(listElmLast);
listsElm.insertBefore(listElmBefore, listElmTwo);
