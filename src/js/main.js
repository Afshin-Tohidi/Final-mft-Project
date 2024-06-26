const minus = document.getElementsByClassName("minus");
const plus = document.getElementsByClassName("plus");
const card = document.getElementsByClassName("cart");
console.log(card);
let basket = {};

for (let i of minus) {
  i.addEventListener("click", (e) => {
    let node = i.parentNode.getElementsByTagName("span")[0];
    let count = node.innerText;
    let productName = i.parentNode.parentNode.parentNode.id;
    count--;
    node.innerText = count;
    basket[productName] = count;
    card[0].innerHtml = Object.keys(basket).length;
    console.log(basket);
  });
}

for (let i of plus) {
  i.addEventListener("click", (e) => {
    let node = i.parentNode.getElementsByTagName("span")[0];
    let count = node.innerText;
    let productName = i.parentNode.parentNode.parentNode.id;

    count++;
    node.innerText = count;
    basket[productName] = count;
    card[0].innerText = Object.keys(basket).length;
    console.log(basket);
  });
}
