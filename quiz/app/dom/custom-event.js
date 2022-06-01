const changeCaption = new Event("changeCaption");

window.addEventListener("load", () => {
  const button = document.getElementById("button");

  button.addEventListener("changeCaption", customEventHandler);
  button.addEventListener("click", () => {
    button.dispatchEvent(changeCaption);
  });
});

const customEventHandler = (e) => {
  console.log(`Event ${e.type} telah di jalankan`);
  const caption = document.getElementById("caption");
  caption.innerText = "Anda telah memanggil custom event";
};
