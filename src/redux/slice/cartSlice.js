import { createSlice } from '@reduxjs/toolkit'

const initialState = {
cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
cartQuantity: 0,
cartAmount:0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
UPDATE_CART: (state, action) => {
console.log(action.payload.cart)
const { clickedProduct , quantity , option , calculatequantity} = action.payload;

const updatedCart = state.cart?.findIndex(item => item?.id === clickedProduct?.id)
    if(updatedCart >= 0 ){

state.cart[updatedCart].calculatequantity += calculatequantity;
// state.cart[updatedCart].option += option;

    //   const updatedCartItems = cart.map((cartProduct) => {
    //     if(cartProduct.id === clickedProduct.id) return {
    //       ...cartProduct,
    //       quantity: cartProduct.quantity + quantity,
    //       option : cartProduct.option +  option
    //     }
    //   })
    
//   state.cart = updatedCartItems
      
    }
  
else{
  clickedProduct.calculatequantity = calculatequantity;
//   clickedProduct.option = option;
  const tempProduct =   {...clickedProduct }
  state.cart.push(tempProduct)

}

localStorage.setItem('cart', JSON.stringify(state.cart))



















}




  }
});

export const {UPDATE_CART} = cartSlice.actions
export const SelectCart = state => state.cart.cart
export const SelectQuantity = state => state.cart.cartQuantity
export const SelectAmount = state => state.cart.cartAmount

export default cartSlice.reducer