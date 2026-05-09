// Select
let itemNumber = document.querySelectorAll(".c-cart__item").length;
const navCount = document.querySelector(".c-btn__count");
const cartCount = document.querySelector(".c-cart__count");
const cartPrice = document.querySelectorAll(".c-cart__price");
const cartCost = document.getElementById("cart-cost");

// Funcs
// e2p = English to Persian
const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const sp = (number) => {
  const separatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = separatedNumber.join(",");
  return e2p(joinedNumber);
};

// Replace
window.addEventListener("load", () => {
  navCount.innerHTML = e2p(itemNumber);
  cartCount.innerHTML = e2p(itemNumber);
  cartCost.innerText = 2500000 * +itemNumber;
  cartPrice.forEach((item) => {
    item.innerText = sp(+item.innerText);
  });
});
