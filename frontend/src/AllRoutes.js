import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Category from './Pages/Category'
import Products from './Pages/Products'
import List from './Pages/List'

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Category/>}/>
        <Route path='/addProducts' element={<Products/>}/>
        <Route path='/listProducts' element={<List/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
