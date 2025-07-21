import authSlice from "./authSlice"
import bookSlice from "./bookSlice"
import cartSlice from "./cartSlice"
import checkoutSlice from "./checkoutSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{
        auth:authSlice,
        book:bookSlice,
        cart:cartSlice,
        checkout:checkoutSlice
    }
})


export default store