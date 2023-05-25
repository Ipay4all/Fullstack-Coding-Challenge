import React, { useEffect } from 'react'
import ProductCards from './ProductCards'

import { useDispatch } from 'react-redux'
import { getAllProducts } from '../store/actions/productActions'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts(dispatch)
    document.title = "Home | iPay"
  }, [dispatch])

  return (
    <div>
        <ProductCards/>
    </div>
  )
}

export default Home

