import Swal from "sweetalert2";
import { productRender, removeCartAddedBtn } from "../app/product";
import { cartItems, cartTotalAmount, cartUi, searchBoxContainer } from "./selectors";
import { products } from "./variable";



export const cartBtnHandler = () => {
  cartUi.classList.toggle("translate-x-full");
  cartUi.classList.add("duration-150");
};

export const categoryListHandler = (event) => {
  if (event.target.classList.contains("category-badge")) {
    const currentCategoryBtn = event.target;
    const currentCategory = currentCategoryBtn.innerText.toLowerCase();
    const lastActiveCategoryBtn = app.querySelector(".category-badge.active");
    lastActiveCategoryBtn.classList.toggle("active");

    currentCategoryBtn.classList.add("active");
    productRender(
      products.filter(
        (product) =>
          product.category === currentCategory || currentCategory == "all"
      )
    );
  }
};

export const orderNowHandler = (event) => {
  //customer-id, product-id, quantity, total, time

  Swal.fire({
    title: "Have a nice day ",
    text: "You order success ",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "rgb(64,64,64)",
    cancelButtonColor: "rgb(245,245,245)",
    cancelButtonText: "Cancel",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      const customer_id = Math.floor(Math.random() * 1000);
      const total = parseFloat(cartTotalAmount.innerText);
      const time = Date.now();
      const order_items = [];
      app.querySelectorAll(".cart-item").forEach((el) => {
        const productId = parseInt(el.getAttribute("product-id"));
        const quantity = parseInt(el.querySelector(".cart-q").innerText);

        order_items.push({
          product_id: productId,
          quantity: quantity,
        });

        el.remove();

        removeCartAddedBtn(productId);
      });
      const order = { customer_id, time, order_items, total };
      console.log(order);
    }
  });
};



// export const searchHandler = (text) => {
//   productRender(products.filter(product => product.title.toLowerCase().search(text.toLowerCase()) >= 0 ))
// }

// searchButton.addEventListener('click', () => {
//   const searchTerm = searchInput.value.toLowerCase();

// });


export const searchBtnHandler = () => {
  if (searchBoxContainer.style.display === 'none') {
      searchBoxContainer.style.display = 'block';
  } else {
      searchBoxContainer.style.display = 'none';
  }
}

