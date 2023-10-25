import { cartObserver } from "./app/cart";
import { categoryRender } from "./app/category"
import { productRender } from "./app/product";
import { cartBtnHandler, categoryListHandler, orderNowHandler, searchBtnHandler } from "./core/handlers";
import { cartBtn, categoryLists, closeCart, orderNow} from "./core/selectors";
import { categories, products } from "./core/variable"

export class Shop{
    preRender(){
        categoryRender(categories);
        productRender(products)
    }

    listener(){
        cartBtn.addEventListener("click",cartBtnHandler)
        closeCart.addEventListener("click",cartBtnHandler)
        categoryLists.addEventListener("click",categoryListHandler)
        orderNow.addEventListener("click",orderNowHandler)
        // searchBtn.addEventListener("click",searchBtnHandler)

    }

    observer(){
        cartObserver()
    }

    init(){
        console.log("Shop App start ")
        this.observer()
        this.preRender()
        this.listener()
    }
    
}