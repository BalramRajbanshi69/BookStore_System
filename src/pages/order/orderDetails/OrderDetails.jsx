import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {APIAuthenticated} from "../../../http/index"
import { toast } from "react-hot-toast";
import EditOrderModal from "./orderModal/EditOrderModal";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.checkout);
  
  // const [showEditModal, setShowEditModal] = useState(false); // State for modal visibility

     
     // intermediate problem solved start
  const [newOrder,setNewOrder] = useState([])
  const fetchOrderDetails = async()=>{
     const response = await APIAuthenticated.get("/order/") 
    if(response.status === 200){
      setNewOrder(response.data.data)
    }
  }

  useEffect(()=>{
    fetchOrderDetails()
  })

  const [filteredOrder] = orders ?  orders.filter((order) => order._id === id) : newOrder.filter((order) => order._id === id) // here we need only single selected order deteail so, order._id should be equal to selected order id from params . directly array desctructing beacuse it coming array

  
  // console.log("filteredorder",filteredOrder);

  
     // intermediate problem solved end

  // navigating to orders qr
  const adminOrderPageUrl = `http://localhost:3000/admin/orders/${id}`
  

  // cancel order
  const cancelOrder = async () => {
    try {
      const response = await APIAuthenticated.patch("/order/cancel/", { id });
      // console.log(response.data);
      if (response.status === 200) {
        toast.success("Order cancelled successfully")
        navigate("/myOrder");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to cancel order")
    }
  };

  // cancel order
  const deleteOrder = async () => {
    try {
      const response = await APIAuthenticated.delete(`/order/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Order deleted successfully")
        navigate("/myOrder");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to delete order")
    }
  };


   // Function to handle saving updates from the modal
  // const handleUpdateOrder = async (updatedData) => {
  //   setShowEditModal(false); // Close the modal first

  //   // Log the data you're about to send to the backend
  //   console.log("Data being sent to backend for update:", updatedData);

  //   try {
  //     const response = await APIAuthenticated.patch(`/order/${id}`, {
  //       // Ensure you're sending the properties exactly as your backend expects them
  //       // For example, if your backend expects 'orderItems' instead of 'items', adjust this.
  //       items: updatedData.items,
  //       shippingAddress: updatedData.shippingAddress,
  //     });

  //     // Log the response from the backend
  //     console.log("Backend response for update:", response.data);

  //     if (response.status === 200) {
  //       toast.success("Order updated successfully!");
  //       // Crucial: Re-fetch the order details to get the latest state from the backend
  //       // This ensures the UI reflects the saved changes.
  //       fetchOrderDetails();
  //     } else {
  //       // Handle non-200 responses if your backend sends specific error codes
  //       toast.error(response.data.message || "Failed to update order on server.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating order:", error);
  //     // More specific error messages based on the error object
  //     if (error.response && error.response.data && error.response.data.message) {
  //       toast.error(`Failed to update order: ${error.response.data.message}`);
  //     } else {
  //       toast.error("An unexpected error occurred while updating the order.");
  //     }
  //   }
  // };



  return (
    <div className="container mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
      <div className="py-22">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center gap-3">
            <span className="text-2xl dark:text-white lg:text-2xl leading-4 text-gray-800 font-semibold">Order : </span>
            <span className="text-2xl dark:text-white lg:text-2xl text-gray-800  text-gray-900 font-semibold">{id}</span>
          </div>
          <p className="text-2xl dark:text-white lg:text-2xl text-gray-800 mt-1">
            <span className="font-semibold">Order CreatedAt</span> : {filteredOrder && new Date(filteredOrder.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="w-full h-[2px]  mt-2 "></div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-200 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                My Order
              </p>
              {filteredOrder &&
                filteredOrder.items.length > 0 &&
                filteredOrder.items.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-35">
                        <img
                          className="w-full hidden md:block"
                          src={item.book.bookImage}
                          alt="dress"
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.book.title}
                          </h3>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            Rs: {item.book.price}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            QTY : {item.quantity}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            Total Rs:{" "}
                            {item.book.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Payment Method
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {filteredOrder?.paymentDetails.method}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Order Status
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {filteredOrder?.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Grand Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    Rs : {filteredOrder?.totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5  text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        {" "}
                        Delivery Charge
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    Rs 100
                  </p>
                </div>
              </div>
            </div>
          </div>
          

          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800 underline underline-offset-4 ">
              Customer
            </h3>

            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-2 xl:space-y-4 md:space-y-0  md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-2 xl:mt-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Address: {filteredOrder?.shippingAddress}
                    </p>
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Phone: {filteredOrder?.phoneNumber}
                    </p>
                  </div>

                  {/* yedi orderStatus cancelled xa vane , edit order button, cancel button and delete button nadekhaune  nadekhaune */}
                  {/* cancelled vako order haru lai edit and delete garna paudaina , so kina dekhaune? */}
                  {/* only orderStatus jasko pending xa , uslai edit and delete and cancel dekhaune */}
                  <div className="w-full">
                    {filteredOrder?.orderStatus !== "cancelled" && (
                      <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button
                              // onClick={() => setShowEditModal(true)} 
                              className="hover:bg-green-700 hover:border-none hover:text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                            >
                              Edit Order
                            </button>
                        </div>

                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button
                            onClick={cancelOrder}
                            className=" hover:bg-yellow-700 hover:border-none hover:text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>

                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button
                            onClick={deleteOrder}
                            className="mt-4 md:mt-0 bg-red-700 border-none text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 "
                          >
                            Delete Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white-200 dark:bg-white-800 w-full  xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <QRCode value={adminOrderPageUrl}/>
          </div>
          </div>

        </div>
      </div>


            {/* Render the EditOrderModal component
      {showEditModal && filteredOrder && (
        <EditOrderModal
          order={filteredOrder}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateOrder}
        />
      )} */}

    </div>
  );
};

export default OrderDetails;