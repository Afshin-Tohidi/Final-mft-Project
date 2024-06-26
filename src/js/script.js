import plusBtn from "../../src/assets/img/shopping-img/plus.svg";
import minusBtn from "../../src/assets/img/shopping-img/minus.svg";
import deleteBtn from "../../src/assets/img/shopping-img/delete.svg";

let cart = localStorage.getItem("mycart");
totalcard = document.getElementById("totalprice");
cart = JSON.parse(cart);
totalprice = 0;

for (const item in cart) {
  totalprice += Number(cart[item].price);
  totalcard.textContent = totalprice;
}

document.addEventListener("DOMContentLoaded", () => {
  const foodContainer = document.getElementById("food-container");
  function fetchFoods() {
    fetch("http://localhost:3131/foods")
      .then((response) => response.json())
      .then((data) => {
        let mydata = data.filter((food) => {
          return cart[food.id];
        });

        displayFoods(mydata);
      });
  }

  fetchFoods();

  function displayFoods(foods) {
    foodContainer.innerHTML = "";
    const item = document.createElement("div");
    item.classList.add("item2");
    const title = document.createElement("div");
    title.classList.add("titles");
    title.innerHTML = `
    <span>خرید شما</span>
    <span class="gheimat">قیمت</span>
    <span>جمع قیمت</span>
    <span>تعداد</span>
    `;
    foodContainer.appendChild(item);
    item.appendChild(title);
    foods.forEach((food) => {
      const foodCard = document.createElement("div");

      foodCard.classList.add("item");
      foodCard.setAttribute("id", `ele${food.id}`);
      foodCard.innerHTML = `
      
          <div class="container-pic">
            <img
              class="pic"
              src="${food.image}"
              alt="${food.name}"
            />
          </div>

          <div  class="content" id="burger-content">
            <span class="title">${food.name}</span>
            <span class="price price-margin">${food.price}</span>
            <span id="food${food.id}price" class="total" >${food.price}ت</span>
            <div class="add-remove">
              <div class="numbers">
                <img
                  class="minus"
                  src="${minusBtn}"
                  alt=""

                  data-id="${food.id}"
                />
                <span data-id="${food.id}" id="food${food.id}" class="quantity">1</span>
                <img
                  class="plus"
                  src="${plusBtn}"
                  alt=""
                  data-id="${food.id}"
                />
              </div>
              <img 
                data-id="${food.id}"
                class="delete"
                src="${deleteBtn}"
                alt=""
              />
            </div>
          </div>
      
      `;

      foodContainer.appendChild(foodCard);
    });

    const plusButtons = document.querySelectorAll(".plus");
    const minusButtons = document.querySelectorAll(".minus");
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        id = btn.getAttribute("data-id");
        let element = document.getElementById(`ele${id}`);
        element.remove();
        totalprice -= cart[id].price * cart[id].count;
        delete cart[id];
        localStorage.setItem("mycart", JSON.stringify(cart));
        cart = localStorage.getItem("mycart");
        cart = JSON.parse(cart);
        totalcard.textContent = totalprice;
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        cart[id].count++;
        let total = cart[id].count * cart[id].price;
        totalprice += Number(cart[id].price);
        dispupdate(id, total);
      });
    });

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (cart[id].count > 1) {
          cart[id].count--;
          totalprice -= Number(cart[id].price);
        }
        let total = cart[id].count * cart[id].price;
        dispupdate(id, total);
      });
    });

    function dispupdate(id, total) {
      let qty = document.getElementById(`food${id}`);
      let totalitem = document.getElementById(`food${id}price`);

      totalitem.textContent = total;
      qty.textContent = cart[id].count;
      totalcard.textContent = totalprice;
    }
  }
});
