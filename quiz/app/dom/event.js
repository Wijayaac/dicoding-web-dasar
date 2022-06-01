const welcome = () => {
  alert("Sim salabim muncullah elemen-elemen HTML!");
  const contents = document.querySelector(".contents");
  contents.style.visibility = "visible";
};
const increment = () => {
  let countElm = document.getElementById("count"),
    counter = parseInt(countElm.innerText);
  if (counter == 7) {
    let hiddenMessage = document.createElement("h4"),
      image = document.createElement("img"),
      contents = document.querySelector(".contents");
    hiddenMessage.innerText = "Selamat! Anda menemukan hadiah tersembunyi...";

    image.setAttribute("src", "https://i.ibb.co/0V49VRZ/catto.jpg");

    contents.appendChild(hiddenMessage).appendChild(image);
  }
  countElm.innerText++;
};

const incrementButton = document.getElementById("increment-button");
incrementButton.addEventListener("click", increment);
document.body.addEventListener("load", welcome());
