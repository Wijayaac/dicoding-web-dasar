const storageKey = "STORAGE_KEY";

const submitAction = document.querySelector("#form-data-user");

const checkForStorage = () => {
  return typeof Storage !== "undefined";
};

const putUserList = (data) => {
  if (checkForStorage()) {
    let userData = [];
    if (localStorage.getItem(storageKey) === null) {
      userData = [];
    } else {
      userData = JSON.parse(localStorage.getItem(storageKey));
    }

    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }

    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
};

const getUserList = () => {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
};

const renderUserList = () => {
  const userData = getUserList();
  const userList = document.querySelector("#user-list-detail");

  userList.innerHTML = "";
  for (const user of userData) {
    console.log(user);
    let row = document.createElement("tr");
    row.innerHTML += `<td> ${user.name} </td>`;
    row.innerHTML += `<td> ${user.age} </td>`;
    row.innerHTML += `<td> ${user.location} </td>`;

    userList.appendChild(row);
  }
};

submitAction.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputName = document.querySelector("#name").value;
  const inputAge = document.querySelector("#age").value;
  const inputLocation = document.querySelector("#location").value;

  const newUserData = {
    name: inputName,
    age: inputAge,
    location: inputLocation,
  };

  putUserList(newUserData);

  renderUserList();
});

document.addEventListener("DOMContentLoaded", () => {
  if (checkForStorage()) {
    if (localStorage.getItem(storageKey) !== null) {
      const userData = getUserList();
      renderUserList(userData);
    }
  } else {
    alert("Browser yang anda gunakan tidak mendukung Web Storage!");
  }
});
