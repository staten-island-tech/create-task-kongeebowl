import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

let money = 500;
gambleButton(money);

function colorCards() {
  colors.forEach((color) => {
    DOMSelectors.box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card w-[90%] sm:w-[50%] md:w-[33%] lg:w-[15%] h-auto  rounded-3xl flex flex-col items-center justify-around m-4 bg-neutral">
            <h2 class="card-title text-2xl text-accent">${color.name}</h2>
            <img src="${color.image}" alt="${color.name}, ${color.rarity}" class="object-contain w-[65%] " />
            <p class="text-xl text-accent">${color.rarity}</p>
          </div>
      `
    );
  });
}
colorCards();

function gachaPull() {
  // Calculate the total weight
  const totalWeight = colors.reduce((sum, color) => sum + color.weight, 0);

  // Generate a random number between 0 and totalWeight
  const randomNum = Math.random() * totalWeight;

  // Determine which color is selected based on the random number
  let cumulativeWeight = 0;
  for (const color of colors) {
    cumulativeWeight += color.weight;
    if (randomNum <= cumulativeWeight) {
      return color;
    }
  }
}

function clearText() {
  DOMSelectors.money.innerHTML = "";
}

function gambleButton(money) {
  DOMSelectors.money_button.addEventListener("click", () => {
    if (money >= 10) {
      money -= 10;
      console.log(money);
      clearText();
      DOMSelectors.money.insertAdjacentHTML(
        "afterbegin",
        `<p class="text-xl">Money: $${money}</p>`
      );
      gachaPull();
      const pulledColor = gachaPull();
      console.log(`You got: ${pulledColor.name} (${pulledColor.rarity})`);
      console.log(`Image: ${pulledColor.image}`);
    } else {
      console.log("you broke as hell");
    }
  });
}

function gachaHistory() {}
