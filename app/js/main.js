import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

function colorCards() {
  colors.forEach((color) => {
    DOMSelectors.box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card w-[90%] sm:w-25 md:w-25 lg:w-21 h-auto  rounded-3xl flex flex-col items-center justify-around m-8 border-2 bg-primary">
            <h2 class="card-title text-2xl ">${color.name}</h2>
            <img src="${color.image}" alt="${color.name}, ${color.rarity}" class="object-contain w-[65%]" />
          </div>
      `
    );
  });
}

colorCards();
