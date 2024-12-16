import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

function colorCards() {
  colors.forEach((color) => {
    DOMSelectors.box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card w-[90%] sm:w-4/5 md:w-2/5 lg:w-1/5 h-auto  bg-[#150709] rounded-3xl flex flex-col items-center justify-around m-8 border-2 border-[#e0d1ad]">
            <h2 class="card-title text-2xl text-[#e0d1ad]">${color.name}</h2>
            <img src="${color.image}" alt="${color.name}, ${color.rarity}" class="object-contain w-[65%]" />
          </div>
      `
    );
  });
}

colorCards();
