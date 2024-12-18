import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

function colorCards() {
  colors.forEach((color) => {
    DOMSelectors.box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card w-[90%] sm:w-[50%] md:w-[33%] lg:w-[15%] h-auto  rounded-3xl flex flex-col items-center justify-around m-4 border-2 bg-primary">
            <h2 class="card-title text-2xl ">${color.name}</h2>
            <img src="${color.image}" alt="${color.name}, ${color.rarity}" class="object-contain w-[65%] " />
            <p class="text-xl">${color.rarity}</p>
          </div>
      `
    );
  });
}

colorCards();
