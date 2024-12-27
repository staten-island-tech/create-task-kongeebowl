import "../css/style.css";
import { DOMSelectors } from "./dom";
import { colors } from "./colors";

console.log(colors);

const history = [];
let money = 500;

updateMoneyDisplay();
gambleButton();

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

function clearText() {
  DOMSelectors.money.innerHTML = "";
}

function updateMoneyDisplay() {
  clearText();
  DOMSelectors.money.insertAdjacentHTML(
    "afterbegin",
    `<p class="text-xl">Money: $${money}</p>`
  );
}

function gachaPull() {
  const totalWeight = colors.reduce((sum, color) => sum + color.weight, 0);

  const randomNum = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const color of colors) {
    cumulativeWeight += color.weight;
    if (randomNum <= cumulativeWeight) {
      return color;
    }
  }
}

function sellDuplicate(color) {
  const rarityValues = {
    Common: 10,
    Uncommon: 25,
    Epic: 50,
    Legendary: 100,
    Mythic: 500,
    Godly: 1000,
  };

  const sellValue = rarityValues[color.rarity];
  money += sellValue;

  console.log(
    `Duplicate color sold: ${color.name} (${color.rarity}). Earned $${sellValue}.`
  );

  updateMoneyDisplay();
}

function gachaHistory() {
  const pulledColor = gachaPull();

  const isDuplicate = history.some((color) => color.name === pulledColor.name);

  if (isDuplicate) {
    sellDuplicate(pulledColor);
  } else {
    history.push(pulledColor);

    DOMSelectors.history_box.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card w-[90%] sm:w-[50%] md:w-[33%] lg:w-[15%] h-auto  rounded-3xl flex flex-col items-center justify-around m-4 bg-neutral">
              <h2 class="card-title text-2xl text-accent">${pulledColor.name}</h2>
              <img src="${pulledColor.image}" alt="${pulledColor.name}, ${pulledColor.rarity}" class="object-contain w-[65%] " />
              <p class="text-xl text-accent">${pulledColor.rarity}</p>
        </div>
      `
    );
  }
}

function gambleButton() {
  DOMSelectors.money_button.addEventListener("click", () => {
    if (money >= 10) {
      money -= 10;
      console.log(`Gambled $10. Balance: $${money}`);
      updateMoneyDisplay();
      gachaHistory();
    } else {
      console.log("you broke as hell");
    }
  });
}
