import { configureStore , combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import filterReducer from './slice/filterSlice'
import cartReducer from "./slice/cartSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer
    
})

const store = configureStore({
    reducer:rootReducer,
    
})


export default store;