import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { fetchOrder } from '../../../store/checkoutSlice';

const MyOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {orders} = useSelector((state)=>state.checkout)
   const [selectedItems,setSelectedItems] = useState("all")    // orderstauts
  const [searchTerm,setSearchTerm] = useState("")   // search set empty first
  const [date,setDate] = useState("");

  const filteredOrders = orders?.filter((order) => selectedItems === "all" || order.orderStatus === selectedItems) // it says that if initially set all true and if false select according to orderStatus user selected
  .filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||                        // also search when your order _id should includes(match,present) , the selectedTerm that user select to search (|| means you can filter more according to your choice)
    order.paymentDetails.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.totalAmount.toString().includes(searchTerm) ||                               // you can use || again and filter according to it whnat you gonna search accordingly like totalMaount number
    order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())             // you can search with orderStatus || again and filter according to it whnat you gonna search accordingly 
  )
  .filter((order) => date === "" || new Date(order.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString());  // filter according to date order created at


  useEffect(()=>{
    dispatch(fetchOrder())
  },[])



  return (
    <div>
      {/* */}
      <div className="bg-gray-200 min-h-screen"> 
        <div className="p-8 rounded-md w-full container mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">My Orders</h2>
            </div>
            <div className="my-2 flex flex-col sm:flex-row sm:justify-start sm:items-center gap-3"> {/* Adjusted gap and alignment */}
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                  onChange={(e)=>setSelectedItems(e.target.value)}
                    className="appearance-none h-full rounded-l border-t sm:rounded-l-none sm:border-l-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-r focus:border-b focus:bg-white focus:border-gray-500" // Adjusted rounded class
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="preparation">Preparation</option>
                    <option value="ontheway">OnTheWay</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search and Date Inputs in a single flex container */}
              <div className="flex items-center gap-3 w-full sm:w-auto"> {/* Use flex to keep them together */}
                <div className="block relative flex-grow"> {/* flex-grow allows search to expand */}
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <input
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  value={searchTerm}
                    placeholder="Search"
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
                {/* Date Input - now right next to search */}
                <div className='flex-shrink-0'> {/* flex-shrink-0 prevents date input from shrinking */}
                  <input  onChange={(e)=>setDate(e.target.value)} value={date} type="date" name="date" id="date" className='bg-white border border-gray-400 rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500' />
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        OrderId
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ordered At
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      filteredOrders && filteredOrders.length > 0 && filteredOrders.map((order)=>{
                        return(
                          <tr key={order?._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p onClick={()=>navigate(`/myorder/${order._id}`)} className="text-gray-900 whitespace-no-wrap font-bold hover:underline hover:cursor-pointer">{order?._id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                                  ${
                                    order.orderStatus === "pending"
                                      ? "text-red-900 bg-red-200"
                                      : "text-green-900 bg-green-200"
                                  }
                                `}
                          >
                            <span className="relative">
                              {order.orderStatus}
                            </span>
                          </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                                  ${
                                    order.paymentDetails.status === "paid"
                                      ? "text-green-900 bg-green-200"
                                      : "text-red-900 bg-red-200"
                                  }
                                `}
                          >
                            <span className="relative">
                              {order.paymentDetails.status} (
                              {order.paymentDetails.method})
                            </span>
                          </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap font-bold">{order?.totalAmount.toFixed(2)}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </td>
                    </tr>
                        )
                      })
                    }
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;