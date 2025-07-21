import { STATUSES } from "../global/component/misc/Statuses"
import {createSlice} from "@reduxjs/toolkit"
import { APIAuthenticated } from "../http"
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        status:STATUSES.SUCCESS
        
    },
   reducers:{
     setItems(state,action){
        state.items = action.payload
    },
    setStatus(state,action){
        state.status = action.payload
    },
    updateItems(state,action){
            //  Find the index of the cart item whose book._id matches the given bookId
            const index = state.items.findIndex((item)=>item.book._id === action.payload.bookId)
            // If the item exists in the cart
            if(index != -1){
            // Update its quantity to the new value from the action payload
            state.items[index].quantity = action.payload.quantity;
            }
        },
        deleteItems(state, action) {
        state.items = state.items.filter((item) => item.book._id !== action.payload)
        },

        // you can also use uppper code OR
        // deleteItems(state, action) {
        //     const index = state.items.findIndex((item) => item.book._id === action.payload);
        //         state.items.splice(index, 1);
            
        // },


        emptyCart(state,action){
            state.items = []
        }
   }
})

export const {setItems,setStatus,updateItems,deleteItems,emptyCart} = cartSlice.actions
export default cartSlice.reducer



export function addToCartItems(bookId){
    return async function addToCartItemsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.post(`/cart/${bookId}`) 
            
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }

    }
}





// fetchCartItems                                     => user added to cart will now been seen when cliked to cart navbar and should fetch added cart
export function fetchCartItems(){                    
    return async function fetchCartItemsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("/cart/")       // since need authentication to fetch addedcartbook in a cart 
             dispatch(setItems(response.data.data));               // setItems response.data.data from backend
            dispatch(setStatus(STATUSES.SUCCESS));   
        } catch (error) {
            // console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}




// // increase / decrease quantity
export function updateCartItem(bookId,quantity){                    
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/cart/${bookId}`,{quantity})       // since need authentication to update cartItem(quantity)  in a cart  + quantity from res.body
            
             dispatch(updateItems({bookId,quantity}));               // updateItems response.data.data from backend
            dispatch(setStatus(STATUSES.SUCCESS));   
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


// delete items from the cart
export function deleteCartItem(bookId) {
    return async function deleteCartItemThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            
           const response =  await APIAuthenticated.delete(`/cart/${bookId}`);
            dispatch(deleteItems(bookId));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}