import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../store/authSlice'
import { setSearchTerm } from '../../store/bookSlice'
import { fetchCartItems } from '../../store/cartSlice'
import { PiSignOutBold } from "react-icons/pi";


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: user } = useSelector((state) => state.auth)
  const { searchTerm } = useSelector((state) => state.book)
  const { items: cart } = useSelector((state) => state.cart)

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }
  const handleLogOut = () => {
    dispatch(logOut())
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav id="header" className="z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between mt-0 px-4 py-2">
        
          {/* Hamburger (mobile only) */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Open menu"
              className="cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20">
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          {/* Desktop menu (Home/Profile) */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <nav>
              <ul className="flex items-center text-base text-blue-600">
                <li>
                  <Link className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4" to="/">Home</Link>
                </li>
                {(user.length > 0 || localStorage.getItem("token")) && (
                  <li>
                    <Link className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 text-blue-600" to="/userprofile">Profile</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Search Bar (center) */}
          <div className="flex-grow flex justify-center px-4 md:px-0">
            <div className="relative flex items-center w-full max-w-md">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full p-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                aria-label="Search"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <button className="absolute left-3 text-gray-500" aria-label="Search button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>


          {/* Cart Icon */}
          {cart.length > 0 && localStorage.getItem("token") && (
            <div className="flex items-center mr-4 cursor-pointer relative" onClick={() => navigate('/cart')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>
            </div>
          )}

          {/* LogOut (right) */}
          <div className="flex items-center">
            {user.length !== 0 || (localStorage.getItem("token") && localStorage.getItem("token") !== "" && localStorage.getItem("token") !== undefined) ? (
              <button onClick={handleLogOut} className="flex items-center gap-2 cursor-pointer text-gray-500 p-2 rounded w-full md:w-auto">
                <PiSignOutBold />
                <span className="hidden md:inline">Sign out</span>
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="cursor-pointer text-gray-500 p-2 rounded border border-gray-300 mr-2">Login</button>
                <button onClick={() => navigate("/register")} className="cursor-pointer text-gray-500 p-2 rounded border border-gray-300">Register</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile slide-out menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-start">
            <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-blue-600">Menu</span>
                <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link to="/" className="text-blue-600 font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  </li>
                  {(user.length > 0 || localStorage.getItem("token")) && (
                    <li>
                      <Link to="/userprofile" className="text-blue-600 font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar












