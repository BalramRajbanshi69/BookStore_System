import { createSlice } from "@reduxjs/toolkit"
import { STATUSES } from "../global/component/misc/Statuses"
import { APIAuthenticated } from "../http"





const checkoutSlice = createSlice({
    name:"checkout",
    initialState:{
        data:[],
        status: STATUSES.SUCCESS,
        orders: null
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setOrder(state,action){                       // register first set user
            state.data.push(action.payload)
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setOrders(state,action){
            state.orders = action.payload
        },
        updatedOrderStatus(state,action){
            const status = action.payload.status
            const orderId = action.payload.orderId

            const updatedOrder = state.orders.map((order)=>{
              return  order._id === orderId ? {...order, orderStatus:status} : order
            })

            state.orders = updatedOrder
        }
    }
})


export const {setOrder,setStatus,setOrders,updatedOrderStatus} = checkoutSlice.actions
export default checkoutSlice.reducer



// thunk middlware 
// create order

export function createOrder(data){
    return async function createOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.post("/order/",data)   
            console.log(response.data);
            
           dispatch(setOrder(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}




// fetch your all order
export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/order/") 
            console.log(response.data.data.reverse());
              
           dispatch(setOrders(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}





// updatedOrderStatusInStore
export function updatedOrderStatusInStore(data){
    return function updatedOrderStatusInStoreThunk(dispatch){
        dispatch(updatedOrderStatus(data))
    }
}














