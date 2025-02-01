import React, { useContext, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../Context/StoreContext'

const MyOrder = () => {
    const {url, token} = useContext(StoreContext);
    const [data,setData] = useState([]);

  return (
    <div>
    
      
    </div>
  )
}

export default MyOrder
