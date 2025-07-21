import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const EditOrderModal = ({ order, onClose, onSave }) => {
  const [editedShippingAddress, setEditedShippingAddress] = useState(order.shippingAddress);
  const [editedItems, setEditedItems] = useState(order.items);

  useEffect(() => {
    setEditedShippingAddress(order.shippingAddress);
    setEditedItems(order.items);
  }, [order]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
      toast.error("Quantity must be a positive number.");
      return;
    }

    setEditedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setEditedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== itemId);
      if (updatedItems.length === 0) {
        toast.error("An order must contain at least one item.");
        return prevItems;
      }
      return updatedItems;
    });
  };

  const handleSave = () => {
    if (!editedShippingAddress.trim()) {
      toast.error("Shipping address cannot be empty.");
      return;
    }
    if (editedItems.length === 0) {
      toast.error("Order must contain at least one item.");
      return;
    }
    onSave({
      shippingAddress: editedShippingAddress,
      items: editedItems,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto max-h-[90vh] transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Edit Order</h2>

        <div className="mb-6">
          <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Shipping Address:
          </label>
          <input
            type="text"
            id="shippingAddress"
            value={editedShippingAddress}
            onChange={(e) => setEditedShippingAddress(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter new shipping address"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 dark:text-white">Order Items</h3>
          {editedItems.length > 0 ? (
            <div className="space-y-3">
              {editedItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 shadow-sm">
                  <div className="flex-1 w-full sm:w-auto mb-2 sm:mb-0">
                    <p className="font-medium text-gray-900 dark:text-white">{item.book.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price: Rs {item.book.price}</p>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <label htmlFor={`qty-${item._id}`} className="sr-only">Quantity</label>
                    <input
                      type="number"
                      id={`qty-${item._id}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      min="1"
                      className="w-20 p-2 border border-gray-300 rounded-md shadow-sm text-center dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition-colors rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No items in this order to edit.</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;