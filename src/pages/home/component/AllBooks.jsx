import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../../../store/bookSlice';
import { useNavigate, useParams } from 'react-router-dom';

const AllBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const { data: books,searchTerm } = useSelector((state) => state.book);
  console.log(books);
  

  const filteredSearchBooks = books?.filter((book)=>book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book._id.includes(searchTerm)
)

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  return (
    <div>
      <section className="w-full bg-black dark:bg-[#0A2025] py-12 px-8">
        <div className="mx-auto max-w-7xl px-5">
          <header className="h-12 mb-8 justify-between items-center flex">
            <h2 className="text-white dark:text-white text-2xl font-bold font-['Roboto']">Shop by Books</h2>
          </header>

          {/* Grid container for books */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
            {filteredSearchBooks && filteredSearchBooks?.map((book) => (
              <div
                key={book._id}
                onClick={()=>navigate(`/bookDetail/${book._id}`)}
                className="bg-gray-100 dark:bg-[#1A3035]  shadow-lg overflow-hidden flex flex-col  cursor-pointer my-6 w-74 h-100 transform   duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Book Image */}
                <div className="flex-shrink-0">
                  <img
                    className="w-full h-75 object-cover"
                    src={book?.bookImage[0]} 
                    alt={book?.title || 'Book Cover'}
                  />
                </div>

                {/* Book Details */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                 <div className='flex justify-between'>
                   <div className='w-[78%]'>
                    <h3 className="text-[#0A2025] dark:text-white text-xl font-bold font-['Roboto'] mb-1">
                      {book?.title || 'Untitled Book'}
                    </h3>
                    <p className="text-[#0A2025] dark:text-gray-300 text-base font-normal font-['Roboto'] mb-1">
                      By: {book?.author || 'Unknown Author'}
                    </p>
                  </div>
                  <div className='w-[28%]'>
                     <p className="text-green-900 font-bold dark:text-gray-300 text-md font-['Roboto']">
                     Rs : {book?.price || 'No price available'}
                    </p>
                  </div>
                 </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBooks;











