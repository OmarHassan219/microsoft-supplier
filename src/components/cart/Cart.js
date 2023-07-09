import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_CART,
  DELETE_PRODUCT,
  SelectCart,
} from "../../redux/slice/cartSlice";
import "./cart.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector(SelectCart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart) {
      console.log(cart);
    }
  }, [cart]);

  const containervariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    },
    exithome: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
    visible1: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        duration: 0.5,
      },
    },
  };

  const handleDelete = (item) => {
    dispatch(DELETE_PRODUCT(item));
  };

  const handleCloseCart = (e) => {
    if(e.target.classList.contains("cart-close") || e.target.classList.contains("cart-container") || e.target.classList.contains("shop-link")){
    dispatch(CLOSE_CART());
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      onClick={(e) => handleCloseCart(e)}
      className="cart-container"
    >
      <motion.div
        variants={containervariants}
        initial="hidden"
        animate="visible1"
        className="cart-section py-4"
      >
        <div className="container">
          <AiOutlineCloseSquare
            onClick={(e) => handleCloseCart(e)}
            className="icon cart-close"
            size={20}
          />

          {cart.length ?  cart.map((item, index) => {
            const incVat =
              (parseFloat(item.price) * parseFloat(item.vat)) / 100 +
              parseFloat(item.price);
            const totalPrice = (
              incVat.toFixed(2) * item.calculatequantity
            ).toFixed(2);
            return (
              <div key={index} className="card-item mt-4 border p-2">
                <div className="d-flex w-100 justify-content-between align-items-center ">
                  <p>{item.name}</p>
                  <button
                    onClick={() => handleDelete(item)}
                    className="border rounded-3 p-1 del-btn"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
                <div className="d-flex">
                  <img width={100} src={item.imageUrl} alt={item.name} />
                  <div className="ms-5">
                    <p className="product-price">
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Incl.
                      </span>
                      VAT €
                      <span className="theprice me-2">{incVat.toFixed(2)}</span>
                      (Price Per Unit)
                    </p>
                    <p>
                     
                      Amount:
                      <span className="ms-1" style={{ color: "red", fontWeight: "bold" }}>
                       
                        {item.calculatequantity}
                      </span>
                    </p>
                    <p>
                      Total Price <sub style={{color:"blue" , fontSize:"10px"}}>Incl Vat</sub> : <span> {totalPrice} </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          }) : (
<div className="d-flex flex-column align-items-center justify-content-center">   
<h2>Cart Empty</h2>
<p>Try adding some products to the cart</p>
<Link className="shop-link" onClick={(e) => handleCloseCart(e)} to='/shop'>Shop</Link>
    </div>

          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
