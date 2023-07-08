import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SelectCart } from '../../redux/slice/cartSlice'
import './cart.css'
import { AiOutlineCloseSquare } from'react-icons/ai'
const Cart = () => {
    const cart = useSelector(SelectCart)

    useEffect(() => {
     if(cart){
        console.log(cart);
     }
    }, [cart])

    
  return (
    <div className='cart-section py-4'>
<div className='container'>
<AiOutlineCloseSquare  size={20}/>
{cart.map((item, index) => {

const incVat =(parseFloat(item.price) * parseFloat(item.vat)) / 100 + parseFloat(item.price);
    const totalPrice = ((incVat.toFixed(2)) *(item.calculatequantity)).toFixed(2)
    return(
        <div className='card-item mt-4 border p-2'>
<p>{item.name}</p>
<div className='d-flex'>
<img width={100} src={item.imageUrl} alt={item.name} />
<div className='ms-5'>
<p className="product-price">
              <span style={{color:'red',fontWeight:'bold'}}>Incl.</span> VAT € <span className="theprice">{incVat.toFixed(2)}</span>  (Price Per Unit)
              </p>
<p> Amount: <span style={{color:'red' , fontWeight:"bold"}}>  {item.calculatequantity} </span> </p>
<p>Total Price: <span>  {totalPrice}  </span></p>
</div>
</div>
</div>
)}
)}





</div>




    </div>
  )
}

export default Cart