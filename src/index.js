const DOG_URL = "http://localhost:3000/pups";
const dogDiv = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");
const filterBtn = document.getElementById("good-dog-filter");
document.addEventListener("DOMContentLoaded", () => {
  getAllDogs();
  dogDiv.addEventListener("click", handleDogClick);
  dogInfo.addEventListener("click", handleInfoClick);
  filterBtn.addEventListener("click", filterDogs);
});

const getAllDogs = () => {
  fetch(DOG_URL)
    .then((res) => res.json())
    .then((data) => displayAllDogs(data))
    .catch((error) => window.alert(error.message));
};

const getAllGoodDogs = () => {
  fetch(DOG_URL)
    .then((res) => res.json())
    .then((data) => {
      const goodDogs = [];
      for (const dog of data) {
        if (dog.isGoodDog) {
          goodDogs.push(dog);
        }
      }
      displayAllDogs(goodDogs);
    })
    .catch((error) => window.alert(error.message));
};

const displayAllDogs = (dogs) => {
  for (const dog of dogs) {
    displayDogName(dog);
  }
};

const displayDogName = (dog) => {
  span = document.createElement("span");
  span.textContent = dog.name;
  span.dataset.id = dog.id;
  dogDiv.appendChild(span);
};

const handleDogClick = (e) => {
  if (e.target.tagName != "SPAN") {
    return;
  }
  const id = e.target.dataset.id;
  getDog(id);
};

const getDog = (id) => {
  fetch(DOG_URL + "/" + id)
    .then((res) => res.json())
    .then((data) => showDog(data))
    .catch((error) => window.alert(error.message));
};

const showDog = ({ id, name, image, isGoodDog }) => {
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const btn = document.createElement("BUTTON");

  img.src = image;
  h2.textContent = name;
  btn.dataset.id = id;
  if (isGoodDog) {
    btn.innerText = "Good Dog!";
    btn.dataset.dogStatus = true;
  } else {
    btn.innerText = "Bad Dog!";
    btn.dataset.dogStatus = false;
  }

  dogInfo.innerHTML = "";
  dogInfo.append(img, h2, btn);
};

const handleInfoClick = (e) => {
  if (e.target.tagName != "BUTTON") {
    return;
  }
  const id = e.target.dataset.id;
  const dogStatus = e.target.dataset.dogStatus === "true" ? false : true;
  console.log(dogStatus, !dogStatus);
  console.log(DOG_URL + "/" + id);
  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ isGoodDog: dogStatus }),
  };
  fetch(DOG_URL + "/" + id, configObj)
    .then((res) => res.json())
    .then((data) => showDog(data))
    .catch((error) => window.alert(error.message));
};

const filterDogs = (e) => {
  if (e.target.innerText.match("OFF")) {
    e.target.innerText = "Filter good dogs: ON";
    getAllGoodDogs();
  } else {
    e.target.innerText = "Filter good dogs: OFF";
    getAllDogs();
  }
};
