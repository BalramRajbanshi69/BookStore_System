import React from 'react'

const Loader = ({status}) => {
  return (
    <div>
        {/* <!-- component --> */}
<div className="h-screen bg-white">
<div className="flex justify-center items-center h-full">
  <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
  <span className='text-4xl font-medium text-gray-500'>{status}</span>
</div>

</div>
    </div>
  )
}

export default Loader