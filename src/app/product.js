import {
  cartBtn,
  cartBtnCount,
  cartItems,
  cartTotalAmount,
  productSection,
} from "../core/selectors";
import { products } from "../core/variable";
import {
  calculateCartAmountTotal,
  calculateCartCount,
  createCartUi,
} from "./cart";

export const productRender = (list) => {
  productSection.innerHTML = "";
  list.forEach((el) => productSection.append(createProductCard(el)));
};

export const ratingUi = (rate) => {
  let result = "";

  for (let i = 1; i <= 5; i++) {
    result += `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 ${
          i <= rate.toFixed(0)
            ? "fill-neutral-700 stroke-neutral-700"
            : "fill-neutral-300 stroke-neutral-300"
        }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
        `;
  }

  return result;
};

export const createProductCard = ({
  id,
  image,
  title,
  description,
  price,
  rating: { rate, count },
}) => {
  const card = document.createElement("div");
  const isCartItem = cartItems.querySelector(`[product-id='${id}']`);

  card.classList.add("product-card");
  card.setAttribute("data-id", id);
  card.innerHTML = `

        <div  class=" w-full text-neutral-700">
            <img
              class="h-36 product-img ms-5 -mb-16"
              src="${image}"
              alt=""
            />
            <div
              class="product-info w-full pt-20 p-5 border border-neutral-700"
            >
              <p class="font-heading text-lg font-bold line-clamp-1 mb-5">
                ${title}
              </p>

              <p class="text-sm line-clamp-3 text-neutral-500 mb-5">
               ${description}
              </p>

              <div
                class="rating flex justify-between border-b border-neutral-700 pb-5 mb-5"
              >
                <div class="flex rating-star">${ratingUi(rate)}</div>
                <p class="rating-text">( ${rate}/ ${count} )</p>
              </div>

              <p class="font-bold mb-2 font-heading text-xl">
                $ <span>${price}</span>
              </p>

              <button ${
                isCartItem && "disabled"
              } class="add-to-cart-btn border font-heading w-full block border-neutral-700 p-3 ${
    isCartItem && "bg-red-400 text-white"
  }">
                ${isCartItem ? "Added" : "Add to Cart"}
              </button>
            </div>
        </div>

    `;

  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", addToCartBtnHandler);

  return card;
};

export const setCartAddedBtn = (productId) => {
  const btn = app.querySelector(`[data-id = '${productId}'] .add-to-cart-btn`);

  btn.innerText = "Added";
  btn.toggleAttribute("disable");
  btn.classList.add("bg-red-400", "text-white");
};

export const removeCartAddedBtn = (productId) => {
  const btn = app.querySelector(`[data-id = '${productId}'] .add-to-cart-btn`);

  btn.innerText = "Add to Cart";
  btn.toggleAttribute("disable");
  btn.classList.remove("bg-red-400", "text-white");
};

const addToCartBtnHandler = (event) => {
  const btn = event.target;
  const currentCart = event.target.closest(".product-card");
  const currentCartImage = currentCart.querySelector("img");
  const currentId = currentCart.getAttribute("data-id");

  setCartAddedBtn(currentId);

  const currentProduct = products.find((el) => el.id == currentId);
  // console.log(currentProduct)

  cartItems.append(createCartUi(currentProduct));

  const img = currentCartImage.getBoundingClientRect();
  const cart = cartBtn.querySelector("svg").getBoundingClientRect();

  const animation = [
    {
      top: img.top + "px",
      left: img.left + "px",
      width: img.width + "px",
      rotate: 0 + "deg",
    },
    {
      top: cart.top + "px",
      left: cart.left + "px",
      width: 0,
      rotate: 360 + "deg",
    },
  ];

  const timing = {
    duration: 500,
    iterations: 1,
  };



  const newImg = new Image(img.width);
  newImg.src = currentCartImage.src;
  newImg.style.position = "fixed";
  newImg.style.zIndex = 51;
  newImg.style.top = img.top + "px";
  newImg.style.left = img.left + "px";

  document.body.append(newImg);

  newImg.animate(animation, timing);

  setTimeout(() => {
    // console.log("animation end");
    // cart move
    cartBtn.classList.add("animate__headShake");
    cartBtn.addEventListener("animationend", () => {
      cartBtn.classList.remove("animate__headShake");
    });
    newImg.remove()
  }, 500);
};
