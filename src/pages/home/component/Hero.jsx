import React from 'react'
import {Link} from "react-router-dom"

const Hero = () => {
  return (
    <div className='relative w-full'>
        {/* <!-- Middle Section --> */}

<section className="w-full flex items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#10111D] to-green-300">
  {/* <!-- Overlay for better text visibility --> */}
  <div className="absolute inset-0 bg-opacity-50"></div>

  {/* <!-- Content --> */}
  <div className="relative z-10 max-w-7xl text-center mx-auto  px-5 text-white">
    <h1 className="mb-6  text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
      Discover Your Next <span className="relative whitespace-nowrap text-green-300 dark:text-green-400">
        <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-pink-400/70 dark:fill-pink-300/60" preserveAspectRatio="none">
          <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
        </svg>
        <span className="relative ">Favorite Book</span>
      </span> in Our Collection
    </h1>
    <p className="mx-auto mb-8 max-w-2xl text-lg">
      Explore our vast collection of books, from classics to bestsellers. Find your next great read today!
    </p>

    {/* <!-- CTA Button --> */}
    <div className="flex justify-center items-center mt-8" data-aos="fade-up" data-aos-delay="400">
      <Link to="/" rel="noopener noreferrer"
        className="relative flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
        <span className="absolute inset-0 rounded-full bg-green-600 opacity-50 animate-pulse"></span>
        <span className="relative z-10 pr-2">Browse Books</span>
      </Link>
    </div>
  </div>

  {/* <!-- Scroll Down Icon --> */}
  <div className="absolute sm:bottom-14 bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <a href="#about" className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  </div>
</section>  
    </div>
  )
}

export default Hero