"use strict";
let cart = {};
import shoppingBtn from "../../src/assets/img/shopping-btn.svg";

document.addEventListener("DOMContentLoaded", () => {
  const foodCards = document.getElementById("food-cards");
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");
      fetchFoods(category);
    });
  });

  function fetchFoods(category) {
    fetch("http://localhost:3131/foods")
      .then((response) => response.json())
      .then((data) => {
        const filteredFoods = data.filter((food) => food.category === category);
        displayFoods(filteredFoods, category);
      });
  }

  function displayFoods(foods, category) {
    foodCards.innerHTML = "";
    foods.forEach((food) => {
      const cardItems = document.createElement("div");
      cardItems.classList.add("card-items");
      cardItems.classList.add(category);
      cardItems.innerHTML = `
      
      <div class="burger-img">
        <img src="${food.image}" alt="${food.name}" />
      </div>

      <div class="content">
        <h2>${food.name}</h2>
        <p>
        ${food.ingredients}
        </p>
   
            <div class="price-btn" data-price=${food.price} data-id=${food.id}>
            <span class="price">${food.price}</span>
            <img src="${shoppingBtn}" alt="" />
            </div>

      </div>
    
      `;
      foodCards.appendChild(cardItems);
    });

    let addbt = document.querySelectorAll(".price-btn");

    addbt.forEach((bt) => {
      bt.addEventListener("click", () => {
        let id = bt.getAttribute("data-id");
        let price = bt.getAttribute("data-price");
        cart[id] = {
          id: id,
          count: 1,
          price: price,
        };
        localStorage.setItem("mycart", JSON.stringify(cart));
      });
    });
  }
});
