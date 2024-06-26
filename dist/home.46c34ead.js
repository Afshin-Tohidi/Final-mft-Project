document.addEventListener("DOMContentLoaded", ()=>{
    const foodCards = document.getElementById("food-cards");
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab)=>{
        tab.addEventListener("click", ()=>{
            const category = tab.getAttribute("data-category");
            fetchFoods(category);
        });
    });
    function fetchFoods(category) {
        fetch("http://localhost:3131/foods").then((response)=>response.json()).then((data)=>{
            console.log(data);
            const filteredFoods = data.filter((food)=>food.category === category);
            displayFoods(filteredFoods);
        });
    }
    function displayFoods(foods) {
        foodCards.innerHTML = "";
        foods.forEach((food)=>{
            const cardItems = document.createElement("div");
            cardItems.classList.add("card-items");
            cardItems.innerHTML = `
      
      <div id="burger-img">
        <img src="${food.image}" alt="${food.name}" />
      </div>

      <div class="content">
        <h2>${food.name}</h2>
        <p>
        ${food.ingredients}
        </p>

        <div class="price-btn">
          <span class="price">${food.price}</span>
          <img src="./src/assets/img/shopping-btn.svg" alt="" />
        </div>
      </div>
    
      `;
            foodCards.appendChild(cardItems);
        });
    }
});

//# sourceMappingURL=home.46c34ead.js.map
