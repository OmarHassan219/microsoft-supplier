import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import useFetchHook from "../../hooks/useFetchHook";
import "./productDetails.css";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination , Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import { Breadcrumb, Image } from "antd";
import { UPDATE_CART } from "../../redux/slice/cartSlice";
import { toast } from "react-hot-toast";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";




const ProductDetails = () => {
    const name = useParams();
    const dispatch = useDispatch();
    const data = useFetchHook("products");
const [clickedProduct, setClickedProduct] = useState('')
const [option, setOption] = useState('')
const [quantity, setquantity] = useState(1)
const [filteredProducts, setFilteredProducts] = useState([])

useEffect(() => {
  dispatch(
    OPEN_LOADING()
  )
  // Simulate a delay to showcase the loader
  const delay = setTimeout(() => {
    dispatch(
      CLOSE_LOADING()
    )
  }, 3000); // Set the desired delay time

  // Clean up the timeout when the component unmounts
  return () => clearTimeout(delay);
}, [dispatch]);
useEffect(() => {
    if(data){
        const product = data?.find(product => {


            return(

                product.name.replace(/ /g, "-") === name.name
                )
            
        })
        setClickedProduct(product)
       const filter = data?.filter(product => {
        
        return product.name.replace(/ /g, "-") !== name.name
        
        
        
       })
       setFilteredProducts(filter)
    }
}, [data , name])

const incVat =(parseFloat(clickedProduct.price) * parseFloat(clickedProduct.vat)) / 100 + parseFloat(clickedProduct.price);

const handleAddToCart =() => {
  
  toast.success(`${clickedProduct.name} Added Successfully to Cart`)

    
dispatch(
  UPDATE_CART({
   
   clickedProduct,
   quantity,
   option,
   calculatequantity: (quantity * option)
  })
)





}







const handleMinus = () => {

if(quantity > 1){
setquantity(prev => prev - 1)


}

}

const location = useLocation();
const breadcrumbNameMap = {
  '/shop': 'shop',
};
const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: 'home',
    },
  ].concat(extraBreadcrumbItems);

  return(

      <div className="product-details-page">
<div className="container">
<div className="row m-0 mb-5">
    <div className="col-lg-4 col-md-6 col-sm-12">
        <Image className="first" src={clickedProduct.imageUrl} alt="image"  />
    </div>
    <div className="col-lg-8 col-md-6 col-sm-12">
        <Breadcrumb items={breadcrumbItems} />
        <h1>{clickedProduct.name}</h1>
        <div className="mt-3">
<p>{`Excl. VAT `} <span style={{color:"blue"}}> &euro; {clickedProduct.price}  </span> <span className="ms-2" style={{fontSize:"13px" , color:"red"}}>(Price Per Unit)</span> </p>
<p>{`Incl. VAT `} <span style={{color:"blue"}}> &euro; {incVat.toFixed(2)}  </span> <span className="ms-2" style={{fontSize:"13px" , color:"red"}}>(Price Per Unit)</span> </p>
        </div>
        <div className="d-flex align-items-center">
            <p className="m-0 me-2">UNITS</p>
            {clickedProduct.type === 'physical software' ? (

            <select value={option} onChange={(e) => setOption(parseInt(e.target.value))}>
                
  <option value="" >Choose an Option</option>
  <option value="100">100</option>
  <option value="250">250</option>
  <option value="500">500</option>
  <option value="1000">1000</option>
  <option value="2000">2000</option>
  <option value="4000">4000</option>
  <option value="10000">10000</option>
</select>




            ):(
              <select value={option} onChange={(e) => setOption(parseInt(e.target.value))}>
                
              <option value="" >Choose an Option</option>
              <option value="20">20</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="4000">4000</option>
              <option value="10000">10000</option>
            </select>





            )}
        </div>
        <div className="d-flex align-items-center mt-4">
<div className="d-flex align-items-center border">
<p onClick={handleMinus} className="m-0 border p-2 minus">-</p>
<p className="m-0 p-2 px-3">{quantity}</p>
<p onClick={() => setquantity(prev => prev + 1)} className="m-0 border p-2 plus">+</p>
</div>
<button onClick={handleAddToCart} className={!option ? ' add-to-cart-btn no-option ms-3' : 'add-to-cart-btn ms-3' } type="button">Add To Cart</button>
        </div>
    </div>
</div>




<div className="add-info ">
    <p className="mb-5 border-top">ADDITIONAL INFORMATION</p>
    <div className="pb-2 border-bottom d-flex align-items-center">
    <p className="m-0">UNITS</p>
    {clickedProduct.type === 'physical software' ? 

<p className="m-0 ms-5">100, 250, 500, 1000, 2000, 4000, 10000</p>
:

<p className="m-0 ms-5">20, 100, 250, 500, 1000, 2000, 4000, 10000</p>
}
    </div>
</div>
<h3 className="mt-4">RELATED PRODUCTS</h3>
<Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        modules={[Pagination , Navigation]}
        className="mySwiper mt-5"
      >
        {filteredProducts?.map((product, index) => {
    
   if(product.type === clickedProduct.type){
const incVat =(parseFloat(product.price) * parseFloat(product.vat)) / 100 + parseFloat(product.price);

return(


<SwiperSlide key={index}>

<div  className="all-products-swiper">
            <div className="image-container">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>
            <div className="products-card-text">
              <p className={ product.type === `physical software` ? `product-type` : `product-type yellow` }>{product.type}</p>
              <h3 className="product-name mb-3">{product.name}</h3>
              <p className="product-price">
                <span style={{color:'blue',fontWeight:'bold'}}>Excl.</span> VAT € <span className="theprice">{parseFloat(product.price).toFixed(2)}</span> (Price Per Unit)
              </p>
              <p className="product-price">
              <span style={{color:'red',fontWeight:'bold'}}>Incl.</span> VAT € <span className="theprice">{incVat.toFixed(2)}</span>  (Price Per Unit)
              </p>
            </div>
             
              <Link to={`/shop/${product.name.replace(/ /g, '-')}`} className="add-to-cart-button">View</Link>
          </div>
</SwiperSlide>


)

   }

        })}
        
      </Swiper>
</div>



  </div>
      ) 
};

export default ProductDetails;
