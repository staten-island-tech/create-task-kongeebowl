import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

async function getData() {
  try {
    const response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      addCards(data);
      infoCard(data);
    }
  } catch (error) {
    console.log(error);
    console.log("big fat error dzsljnc");
  }
}

getData();

function addCards(data) {
  const apiData = data.data;

  apiData
    .sort((a, b) => a.id - b.id)
    .forEach((obj) => {
      DOMSelectors.box.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card w-[90%] sm:w-4/5 md:w-2/5 lg:w-1/5 h-auto  bg-[#150709] rounded-3xl flex flex-col items-center justify-around m-8 border-2 border-[#e0d1ad] font-hylia">
            <h2 class="card-title text-2xl text-[#e0d1ad]">${obj.name}</h2>
            <img src="${obj.image}" alt="${obj.name}, ${obj.category}, ${obj.common_locations}" class="object-contain w-[65%]" />
            <p class="text-base text-[#87a4b4]">${obj.id}</p>
            <button class="text-black bg-white rounded-xl w-[30%] border-black border-2 transition-transform duration-300 hover:scale-110" id="${obj.id}">Read More</button>
          </div>
       
      `
      );
    });
}

function clear() {
  DOMSelectors.box.innerHTML = "";
}

function infoCard(data) {
  const apiData = data.data;
  DOMSelectors.box.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedItem = apiData.find((item) => item.id == event.target.id);
    if (selectedItem) {
      clear();
      DOMSelectors.box.insertAdjacentHTML(
        "beforeend",
        `
          <div class="card w-[40%] mx-auto bg-[#150709] text-[#e0d1ad] rounded-3xl p-8 border-2 border-[#e0d1ad] font-hylia">
            <h2 class="text-3xl text-center">${selectedItem.name}</h2>
            <img src="${selectedItem.image}" alt="${selectedItem.description}" class="object-contain w-[90%]" />
            <p class="text-lg">${selectedItem.description}</p>
            <button class="go-back-btn text-black bg-white rounded-xl w-[30%] border-black border-2 transition-transform duration-300 hover:scale-110">Go Back</button>
          </div>
          `
      );

      document.querySelector(".go-back-btn").addEventListener("click", () => {
        clear();
        addCards(data);
        infoCard(data);
      });
    }
  });
}
