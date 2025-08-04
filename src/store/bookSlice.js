import { STATUSES } from "../global/component/misc/Statuses"
import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { API } from "../http";
const bookSlice = createSlice({
    name:"book",
    initialState:{
        data:[],
        status:STATUSES.SUCCESS,
        selectedBookDetail:{},
        searchTerm : ""
        
    },
   reducers:{
     setBook(state,action){
        state.data = action.payload
    },
    setStatus(state,action){
        state.status = action.payload
    },
    setSelectedBookDetails(state,action){
        state.selectedBookDetail = action.payload
    },
    setSearchTerm(state,action){
        state.searchTerm = action.payload
    }
   }
})

export const {setBook,setStatus,setSelectedBookDetails,setSearchTerm} = bookSlice.actions
export default bookSlice.reducer



export function fetchAllBooks(data){
    return async function fetchAllBooksThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get("/books",data)
            console.log("response",response.data);          
            dispatch(setBook(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }

    }
}


export function fetchSingleSelectedBookDetails(id){
    return async function fetchSingleSelectedBookDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          const response = await API.get(`/books/${id}`)        // getting single book throught id backend
          dispatch(setSelectedBookDetails(response.data.data))      // from reducers
          dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))  
        }
    }
}













