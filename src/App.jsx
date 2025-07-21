import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import store from './store/store'
import { Provider } from 'react-redux'
import Toast from './toast/Toast'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Footer from './global/footer/Footer'
import BookDetails from './pages/bookDetails/BookDetails'
import Navbar from './global/navbar/Navbar'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import MyOrder from './pages/order/myOrder/MyOrder'
import UserProfileOrder from './pages/order/navLinkOrder/UserProfileOrder'
import OrderDetails from './pages/order/orderDetails/OrderDetails'

const App = () => {
  return (
      <>
      <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <Toast/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/bookDetail/:id' element={<BookDetails/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/userprofile' element={<UserProfileOrder/>} />
        <Route path='/myOrder' element={<MyOrder/>} />
        <Route path='/myorder/:id' element={<OrderDetails/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      </Provider>
      </>
  )
}

export default App