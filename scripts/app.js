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
const submenuBox = document.querySelector(".c-submenu__box");
const submenuTabs = document.querySelectorAll(".c-submenu__tab");
const submenuWrapper = document.querySelectorAll(".c-submenu__wrapper");
const submenuListItems = document.querySelectorAll(".c-submenu__item");
// window

let isCoarsePointer = window.matchMedia(
  "(aspect-ratio < 1/1), (pointer: coarse)",
).matches;

// Perform some actions on the desired element
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
// cart modal action => Open/Close
modalHandler({
  openEl: cart,
  closeEl: coverCart,
  onToggle: () => {
    isCoarsePointer
      ? (coverCart.classList.toggle("u-d-none"),
        modalCart.classList.toggle("u-touch-translate-x-0"))
      : (cart.classList.toggle("u-z-index-5"),
        coverCart.classList.toggle("u-d-none"),
        modalCart.classList.toggle("u-d-none"));
  },
});
// modal || btn -- register action => click
modalHandler({
  openEl: register,
  closeEl: coverReg,
  onToggle: () => {
    coverReg.classList.toggle("u-d-none");
    modalReg.classList.toggle("u-d-none");
  },
});
// submenu hover action => mouseEnter/mouseLeave
modalHandler({
  openEl: submenu,
  closeEl: submenu,
  openAction: "mouseenter",
  closeAction: "mouseleave",
  onToggle: () => {
    !isCoarsePointer &&
      (header.classList.toggle("u-z-index-10"),
      coverHeader.classList.toggle("u-d-none"));
  },
});
// hamburger menu action => Open/Close
modalHandler({
  openEl: openHamburgerMenuBtn,
  closeEl: closeHamburgerMenuBtn,
  onToggle: () => {
    coverMobileMenu.classList.toggle("u-d-none");
    mobileMenu.classList.toggle("c-navbar__menu--show");
  },
});
coverMobileMenu.addEventListener("click", () => {
  coverMobileMenu.classList.toggle("u-d-none");
  mobileMenu.classList.toggle("c-navbar__menu--show");
});
// navbar mobile menu action =>
const navbarLink = submenu.children[0];

modalHandler({
  openEl: navbarLink,
  closeEl: navbarLink,
  onToggle: () => {
    isCoarsePointer &&
      (navbarLink.classList.toggle("is-active"),
      submenuBox.classList.toggle("u-d-block"));
  },
});
let isValid = {
  name: false,
  username: false,
  phone: false,
  email: false,
};
// check inputs validly
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
// set event Listener
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

submenuTabs.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.classList.toggle("is-active");
  });
});

window.addEventListener("resize", () => {
  isCoarsePointer = window.matchMedia(
    "(aspect-ratio < 1/1), (pointer: coarse)",
  ).matches;
  !isCoarsePointer &&
    (submenuBox.classList.remove("u-d-block"),
    coverMobileMenu.classList.add("u-d-none"),
    mobileMenu.classList.remove("c-navbar__menu--show"));
});
