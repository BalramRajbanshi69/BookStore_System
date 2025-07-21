import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCartItem, updateCartItem } from '../../store/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {items:books} = useSelector((state)=>state.cart)

  //increase or decrease quantity
  const handleQuantityChange = (bookId,newQuantity)=>{
      // Ensure newQuantity doesn't go below 1
    if (newQuantity >= 1) {
      dispatch(updateCartItem(bookId, newQuantity))
    }
    dispatch(updateCartItem(bookId,newQuantity)) 
  }

  const handleDelete = (bookId)=>{
    dispatch(deleteCartItem(bookId))
  }

    // totalitems & totalAmount
   const totalItems = books?.reduce((sum,item)=>item.quantity + sum,0);
   const totalAmount = books?.reduce((sum,item)=>item.quantity * item.book.price + sum,0);
   const Shipping = 100;
   const grandTotal = Shipping + totalAmount
   


   
  
  
  return (
    <div>
      {/* <!-- component --> */}
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart </h2>
    
 
    <div className="space-y-4">
      {/* <!-- Cart Item 1 --> */}
      {
        books && books?.map((book)=>{
          return (
            <div key={book?.book._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <img src={book?.book.bookImage} alt="Product" className="w-20 h-20 object-cover rounded-md"/>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{book?.book.title}</h3>
          <p className="text-sm text-gray-500">{book?.book.author}</p>
          <p className="text-sm text-gray-500">{book?.book.description}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div>
            <p className="text-sm text-gray-500 ">Quantity</p>
          </div>
          <div>
            {/* <span onClick={()=>handleQuantityChange(book?.book._id,book.quantity - 1)} className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" > - </span> */}
            <span onClick={() => {
              if (book.quantity > 1) { // Only decrease if quantity is greater than 1
                handleQuantityChange(book?.book._id, book.quantity - 1);
              }
            }} className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" > - </span>
          <input onChange={(e)=>handleQuantityChange(book?.book._id,e.target.value)} className=" cursor-pointer w-8 text-center" type='number' value={book.quantity} min={1}/>
          <span onClick={()=>handleQuantityChange(book?.book._id,book.quantity + 1)} className=" cursor-pointer text-gray-500 hover:text-gray-700 text-2xl"> + </span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-3 '>
          <div className='flex flex-col gap-4'>
            <p className="text-sm text-gray-500  text-right">Price</p>
            <p className="font-semibold text-gray-900 w-20 text-right">{book?.book.price}</p>
          </div>
        </div>
        <div className='flex flex-col items-center gap-3 '>
          <div className='flex flex-col gap-4'>
            <p className="text-sm text-gray-500  text-right">SubTotal</p>
            <p className="font-semibold text-gray-900 w-20 text-right">{book.quantity * book.book.price}</p>
          </div>
        </div>
        <div className="ml-4">
          <button  className="text-gray-400 hover:text-red-500">
          <svg onClick={()=>handleDelete(book.book._id)} className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        </div>
      </div>
          )
        })
      }
       


      {/* <!-- Summary --> */}
      <div className="mt-6 pt-6 border-t">
         <div className="flex justify-between text-base text-gray-900 mb-2">
          <p>Total Items</p>
          <p className="font-semibold">{totalItems}</p>
        </div>
        <div className="flex justify-between text-base text-gray-900 mb-2">
          <p>totalAmount</p>
          <p className="font-semibold"> Rs: {totalAmount}</p>
        </div>
        <div className="flex justify-between text-base text-gray-500 mb-4 border-b-1">
          <p>Shipping</p>
          <p> Rs: {Shipping}</p>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
          <p>GrandTotal</p>
          <p> Rs: {grandTotal}</p>
        </div>
        
        <button onClick={()=>navigate("/checkout")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
          Checkout
        </button>
      </div>
    </div>
      
  </div>
</div>
    </div>
  )
}

export default Cart