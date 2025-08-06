
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { emptyCart } from '../../store/cartSlice'
import { APIAuthenticated } from '../../http'
import Loader from '../../global/loader/Loader'

const KhaltiSuccess = () => {
  const dispatch = useDispatch()
  const queryParams =new URLSearchParams(location.search)
  const pidx = queryParams.get("pidx")
  const [loading,setLoading] = useState(true)

  const verifyPidx = async()=>{
    try {
      const response = await APIAuthenticated.post("/payment/verifypidx/",{pidx})
      if(response.status === 200){
        setLoading(false)
        alert(response.data.message)
        dispatch(emptyCart())                   // clear cart from state too
        window.location.href = "/"
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{          // first time mount
    verifyPidx()
  },[])

  if(loading){
    return (
      <Loader status="Verifying"/>
    )
  }else{
    return (
      <Loader status ="Verified"/>
    )
  }
}

export default KhaltiSuccess









