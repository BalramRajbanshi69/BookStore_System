import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { registerUser } from '../../../store/authSlice'
import { STATUSES } from '../../../global/component/misc/Statuses'

const Register = () => {

    const {register,handleSubmit,formState: { errors }} = useForm()
    const dispatch = useDispatch()
    const {status} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    

    const handleRegisterData = (data)=>{
      try {
        dispatch(registerUser(data))
        if(status === STATUSES.SUCCESS){
          toast.success("User registered successfully");
          navigate("/login")
        }
      } catch (error) {
        console.error(error);
        toast.error("Error registering user")
        
      }
    }
    
    
  return (
    <div>
        {/* <!-- component --> */}
<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

<div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
  <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-6 rounded-md w-full max-w-md">
    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register To Your Account</div>
    <div className="relative mt-10 h-px bg-gray-300">
      <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Register With Email</span>
      </div>
    </div>
    <div className="mt-10">
      <form onSubmit={handleSubmit((data)=>{
        handleRegisterData(data)
      })}>
        
        <div className="flex flex-col mb-6">
          <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
          <div className="relative">
             <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Username icon">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>

            <input {...register("username",{required:"Username is required",minLength:{value:3,message:"Username must have at least 3 characters"},maxLength:{value:20,message:"Username must not exceed more than 20 characters"}})} id="username" type="text" name="username" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Username" />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
        </div>

        <div className="flex flex-col mb-6">
  <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-mail Address:</label>
  <div className="relative">
   <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>

    <input 
    {...register("email",{
      required:"Email is required",
      pattern:{
        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message:"Invalid email address"
      }
    })}
      id="email" 
      type="email" 
      name="email" 
      className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" 
      placeholder="E-mail Address" 
    />
    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
  </div>
</div>
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input {...register("password",{
              required:"Password is required",
              minLength:{
                value:8,
                message:"Password must have at least 8 characters"
              }
            })} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Phone:</label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input {...register("phone",{
    required:"Phone number is required",
    pattern:{
      value:/^(97|98)\d{8}$/,
      message:"Invalid phone number (should start with 97 or 98 and have 10 digits)"
    }
  })}  id="phone" type="number" name="phone" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Phone" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="flex items-center mb-6 -mt-4">
          <div className="flex ml-auto">
            <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
          </div>
        </div>

        <div className="flex w-full">
          <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
            <span className="mr-2 uppercase">Register</span>
            <span>
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
    <div className="flex justify-center items-center mt-6">
      <Link to="/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
        <span>
          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </span>
        <span  className="ml-2 text-sm">Already have an account? <span>Login</span></span>
      </Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default Register