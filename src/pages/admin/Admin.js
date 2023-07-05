import React, { useState } from 'react'
import './admin.css'
import {Routes, Route, Link} from'react-router-dom'
import AddProducts from './addProducts/AddProducts'
import {IoMdArrowDropright } from 'react-icons/io'
import {IoClose } from 'react-icons/io5'
import AllProducts from './allProducts/AllProducts'
const Admin = () => {
const [showAdminNav, setshowAdminNav] = useState(false)


const mobileAdminNav = (

<div onClick={() => setshowAdminNav(false)} className='mobile-admin-nav'>
    <IoClose className='icon' onClick={() => setshowAdminNav(false)} size={25} />
<Link to='/admin/home'>Home</Link>
<Link to='/admin/add-products'>Add Products</Link>
<Link to='/admin/all-products'>All Products</Link>
</div>

)




  return (
    <div className='admin d-flex '>

<IoMdArrowDropright onClick={() => setshowAdminNav(true)}  className='adminmenu-icon icon align-self-center' size={23}/>
{  showAdminNav ?   mobileAdminNav : ''}

        
<div className='admin-nav'>
<Link to='/admin/home'>Home</Link>
<Link to='/admin/add-product/new-product'>Add Products</Link>
<Link to='/admin/all-products'>All Products</Link>
</div>





<div className='admin-pages'>
<Routes>
{/* <Route path='/admin/home' element={<Home />} /> */}
<Route path='/add-product/:id' element={<AddProducts />} />
<Route path='/all-products' element={<AllProducts />} />



</Routes>




</div>

    </div>
  )
}

export default Admin