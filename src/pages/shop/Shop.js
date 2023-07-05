import React, { useEffect, useState } from 'react'
import useFetchHook from '../../hooks/useFetchHook'
import './shop.css'
import ProductCard from '../../components/productCard/ProductCard'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_PRODUCTS, SelectFilteredProducts } from '../../redux/slice/filterSlice'
const Shop = () => {
    const dispatch = useDispatch()
const data = useFetchHook('products')
const Physical = data?.filter((item) => {

    return item.type === "physical software"
    
    })
    const Digital = data?.filter((item) => {
    
    return item.type === "digital software"
    
    })
    const PAGE_SIZE = 6; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);

const handlePageChange = (page) => {
    setCurrentPage(page);
  };



const productssss = useSelector(SelectFilteredProducts)


useEffect(() => {
    dispatch(
        
FILTER_PRODUCTS({
products: data,
type:''

})


    )


}, [data, dispatch])



// const  products  = useSelector(SelectFilteredProducts)












var paginatedData = productssss?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );



const handlePhysicalProducts = () => {

    dispatch(

        FILTER_PRODUCTS({
        products: data,
        type: "physical software"
        
        })
        
        
            )

}

const handleDigitalProducts = () => {
    dispatch(

        FILTER_PRODUCTS({
        products: data,
        type: "digital software"
        
        })
        
        
            )


}




const handleAll = () => {
    dispatch(

        FILTER_PRODUCTS({
        products: data,
        type: ""
        
        })
        
        
            )





}




  return (
    <div className='shop p-4'>
<div className='container d-flex flex-md-row flex-lg-row flex-column align-items-md-start align-items-center'> 
<div className='types '>
<h4>Product Categories</h4>
<div >

<div>

<p style={{color:"blue" , cursor:"pointer"}} onClick={handlePhysicalProducts}>Physical software 
    <span className='ms-4'>{Physical?.length}</span>
</p>
<p>Minimal Order Quantity: 100</p>
</div>
<div>

<p style={{color:"blue" , cursor:"pointer"}} onClick={handleDigitalProducts}>Digital software 
    <span className='ms-4'>{Digital?.length}</span>
</p>
<p>Minimal Order Quantity: 20</p>
</div>
<p onClick={handleAll} style={{color:"blue" , cursor:"pointer"}}>All Products</p>
</div>
</div>
<div className='products-view'>
<div className="all-products">
      <div className="all-products-container">
        {
            productssss ? 
            <ProductCard products={paginatedData}  />
            : null
        }
      </div>
      <div className='text-center'>

        <Pagination
      current={currentPage}
      pageSize={PAGE_SIZE}
      total={productssss?.length}
      onChange={handlePageChange}
      />
      </div>
    </div>





</div>





</div>




    </div>
  )
}

export default Shop