import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleSelectedBookDetails } from "../../store/bookSlice";
import { addToCartItems } from "../../store/cartSlice";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id: bookId } = useParams();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.auth);
  const { selectedBookDetail } = useSelector((state) => state.book);
  const book = selectedBookDetail[0];
  console.log(book);

  useEffect(() => {
    dispatch(fetchSingleSelectedBookDetails(bookId));
  }, [bookId, dispatch]);

  const handleAddToCart = () => {
    try {
      if (
        user?.length == 0 &&
        (localStorage.getItem("token") == "" ||
          localStorage.getItem("token") == null ||
          localStorage.getItem("token") == undefined)
      ) {
        return navigate("/login");
      }

      dispatch(addToCartItems(bookId));
      toast.success("Book added to cart successfully");
    } catch (error) {
      console.error(error);
      toast.error("failed to add book to cart");
    }
  };

  return (
    <div>
      {/* */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap ">
            <img
              alt="ecommerce"
              className="lg:w-1/2  w-full object-cover object-center rounded border border-gray-200"
              src={
                book?.bookImage ||
                "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col gap-2">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {book?.title || "Loading..."}
              </h1>
              <h2 className="text-md font-bold title-font text-gray-500 tracking-widest">
                By : {book?.author || "Loading..."}
              </h2>

              <p className="leading-relaxed">
                {book?.description || "No description available."}
              </p>
              <p className="leading-relaxed">
                Publication Date : {book?.publication || "No publication date."}
              </p>

              <div>
                <p className="leading-relaxed">
                  Status :{" "}
                  <span
                    className={
                      book?.bookStatus === "available"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {book?.bookStatus || "Unknown"}
                  </span>
                </p>
                <p className="leading-relaxed">
                  Stock Remaining : {book?.stockQuantity ?? "N/A"}
                </p>
              </div>
              <div className="border-b-1 mt-2 border-zinc-600"></div>
              <div className="flex mt-2 justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs : {book?.price ?? "N/A"}
                </span>
                <div>
                  {book?.stockQuantity > 0 && book?.bookStatus === "available" ? (
                    <button
                      onClick={handleAddToCart}
                      className=" cursor-pointer flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled
                      className="cursor-not-allowed flex ml-auto text-white bg-red-400 border- py-2 px-6 focus:outline-none rounded opacity-70 hover:bg-red-700"
                    >
                      Out of Stock/Unavailable at the moment{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
