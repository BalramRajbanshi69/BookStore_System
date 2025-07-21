import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { APIAuthenticated } from "../../http";
import toast from "react-hot-toast";
import { deleteCartItem, emptyCart } from "../../store/cartSlice";
import { STATUSES } from "../../global/component/misc/Statuses";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/checkoutSlice";

const Checkout = () => {
      const {items:books} = useSelector((state)=>state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
   const {register,handleSubmit,formState} = useForm()
   const [paymentMethod,setPaymentMethod] = useState("COD")
   const {data,status} = useSelector((state)=>state.checkout)
   const subTotal = books?.reduce((amount,item)=>item.quantity * item.book.price + amount,0)
   const shippingAmount = 100
   const totalAmount = subTotal + shippingAmount
   const handleOrder = (data)=>{
    const orderDetails = {
        shippingAddress : data.shippingAddress, 
        totalAmount : totalAmount,
        items : books,
        paymentDetails : {
            method : paymentMethod
        },
        phoneNumber : data.phoneNumber
    }
    dispatch(createOrder(orderDetails))
    toast.success("Order placed successfully") 
    setTimeout(() => {
      dispatch(emptyCart())
      navigate("/userprofile")
    }, 1000); 
   }


   const proceedForKhaltiPayment = ()=>{
    const currentOrder = data[data.length -1]
    if(status === STATUSES.SUCCESS && paymentMethod === "COD" ){
       return;
        // return alert("Order placed successfully")
     }  
    if(status === STATUSES.SUCCESS && paymentMethod === "khalti" ){
        const {totalAmount,_id:orderId} = data[data.length -1]
        
       handleKhalti(orderId,totalAmount)
    }

   }

   useEffect(()=>{
    proceedForKhaltiPayment()
   },[status,data])

   const handlePaymentChange = (e)=>{
    setPaymentMethod(e.target.value)

   }
   const handleKhalti = async (orderId,totalAmount)=>{
    try {
      const response = await APIAuthenticated.post('/payment',{orderId,amount:totalAmount})
      if(response.status === 200){
        window.location.href = response.data.paymentUrl
      }
    } catch (error) {
      console.log(error)
    }
   }

  //  handle delete items
    const handleDelete = (bookId)=>{
        dispatch(deleteCartItem(bookId))
    }
          
  return (
    <div className=" py-20 container mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">

      <div className="grid  lg:grid-cols-2 gap-6">
        
        <form onSubmit={handleSubmit((data)=>{
            handleOrder(data);
            
        })}>
            <div className="mt-10 bg-gray-100 rounded-xl px-4  pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div>
            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                {...register("email",{required:"Email is required"})}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
              <p className="mt-1 text-red-600">{formState.errors.email && formState.errors.email.message}</p>
              {/* phoneNumber */}
               <label htmlFor="phoneNumber" className="mt-4 mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your phone number"
                {...register("phoneNumber",{required:"phoneNumber is required"})}
              />
              </div>
              <p className="mt-1 text-red-600">{formState.errors.phoneNumber && formState.errors.phoneNumber.message }</p>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                    {...register("shippingAddress",{required:"Shipping Address is required"})}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p className="mt-1 text-red-600">{formState.errors.shippingAddress && formState.errors.shippingAddress.message}</p>

            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Rs : {subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">Rs : {shippingAmount}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">Rs : {totalAmount}</p>
            </div>
          </div>
         {
          paymentMethod ==="COD" ? (
             <button className="mt-4 cursor-pointer mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
          ) :(
             <button className="mt-4 cursor-pointer mb-8 w-full rounded-md bg-[#4a1772] px-6 py-3 font-medium text-white">
            Pay with Khalti
          </button>
          )
         }
        </div>
        </form>
        <div className=" bg-gray-100 rounded-xl px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

            { books && books.map((book)=>{
                return (
                    <div key={book.book._id}>
            <div  className="flex flex-col rounded-lg bg-white sm:flex-row ">
              <img
                className="m-2 h-24 w-28 rounded-md  object-cover object-center"
                src={book.book.bookImage}
                alt="book-image"
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  {book.book.title}
                </span>
                <span className="float-right text-gray-400">Qty: {book.quantity}</span>
                <p className="text-lg font-bold">Rs: {book.book.price}</p>
              </div>
              {/* delete */}
              <div onClick={()=>handleDelete(book.book._id)} className="flex items-center justify-center space-x-4">
                <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
              <div className="w-full h-[1.5px] bg-gray-200"></div>
                    </div>
                )
            })}
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                onChange={handlePaymentChange}
                checked={paymentMethod === "COD"}          // initially make COD a checked
                value="COD"
                
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">COD (Cash On Delivery)</span>
                  
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                onChange={handlePaymentChange}
                value="khalti"
                
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Khalti</span>
                  
                </div>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;










