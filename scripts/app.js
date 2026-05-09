// elements => header, cart, register
const header = document.querySelector(".l-header");
const cart = document.getElementById("cart");
const register = document.getElementById("register");
const mobileMenu = document.querySelector(".c-navbar__menu");
// covers =>
const coverCart = document.querySelector(".c-cover--cart");
const coverReg = document.querySelector(".c-cover--register");
const coverHeader = document.querySelector(".c-cover--header");
const coverMobileMenu = document.querySelector(".c-cover--mobile-menu");
// modals =>
const modalCart = document.querySelector(".c-modal--cart");
const modalReg = document.querySelector(".c-modal--register");
// Buttons => cart, register
const cartBtn = document.getElementById("cart-submit");
const regBtn = document.getElementById("register-submit");
const openHamburgerMenuBtn = document.getElementById("open-hamburger-menu");
const closeHamburgerMenuBtn = document.getElementById("close-hamburger-menu");
// others
const modalItems = document.querySelectorAll(".c-cart__item--remove");
const emptyItem = document.querySelector(".c-cart__empty");
const inputs = modalReg.querySelectorAll("input");
// submenu
const submenu = document.getElementById("submenu");
const submenuTabs = document.querySelectorAll(".c-submenu__tab");
const submenuListItems = document.querySelectorAll(".c-submenu__item");

// Funcs
const modalHandler = ({
  openEl,
  closeEl,
  openAction = "click",
  closeAction = "click",
  onToggle,
}) => {
  const toggle = () => {
    onToggle?.();
  };

  openEl?.addEventListener(openAction, toggle);
  closeEl?.addEventListener(closeAction, toggle);
};

// cart basket handle
modalItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (itemNumber <= 0) return;
    item.parentElement.classList.add("u-d-none");
    itemNumber -= 1;
    navCount.innerHTML = e2p(itemNumber);
    cartCount.innerHTML = e2p(itemNumber);
    cartCost.innerText = sp(2500000 * +itemNumber);

    if (itemNumber === 0) {
      emptyItem.classList.toggle("u-d-none");
      cartBtn.disabled = "true";
    }
  });
});
// Open/Close modal => modalHandler
modalHandler({
  openEl: cart,
  closeEl: coverCart,
  onToggle: () => {
    cart.classList.toggle("u-z-index-5");
    coverCart.classList.toggle("u-d-none");
    modalCart.classList.toggle("u-d-none");
  },
});
modalHandler({
  openEl: register,
  closeEl: coverReg,
  onToggle: () => {
    coverReg.classList.toggle("u-d-none");
    modalReg.classList.toggle("u-d-none");
  },
});
modalHandler({
  openEl: submenu,
  closeEl: submenu,
  openAction: "mouseenter",
  closeAction: "mouseleave",
  onToggle: () => {
    header.classList.toggle("u-z-index-10");
    coverHeader.classList.toggle("u-d-none");
  },
});
modalHandler({
  openEl: openHamburgerMenuBtn,
  closeEl: closeHamburgerMenuBtn,
  onToggle: () => {
    coverMobileMenu.classList.toggle("u-d-none");
    mobileMenu.classList.toggle("c-navbar__menu--show");
  },
});
let isValid = {
  name: false,
  username: false,
  phone: false,
  email: false,
};
// check validly form inputs
const validators = {
  name: (value) => /^[\u0600-\u06FFa-zA-Z‌ ]{3,20}$/.test(value),
  username: (value) =>
    /^(?![0-9_-])[a-zA-Z0-9_-]{3,20}$/.test(value) &&
    /^[\x00-\x7F]+$/.test(value),
  phone: (value, input) => {
    let v = p2e(value) || value;
    v = v.replace(/\D/g, "");

    if (v.startsWith("0")) v = v.slice(1);

    v = v.slice(0, 10);

    input.value = e2p(v);

    return /^9\d{9}$/.test(v);
  },
  email: (value, input) => input.checkValidity(),
};
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const value = input.value;
    const hasValue = value.length > 0;

    input.classList.toggle("has-value", hasValue);

    const validator = validators[input.name];

    const valid = validator(value, input);

    isValid[input.name] = valid;

    input.classList.toggle("valid", hasValue && valid);
    input.classList.toggle("invalid", hasValue && !valid);

    regBtn.disabled = !Object.values(isValid).every(Boolean);
  });
});
