import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_LOADING, OPEN_LOADING } from '../../redux/slice/loadingSlice';
import { selectUserEmail } from '../../redux/slice/authSlice';
import { SelectPlanss } from '../../redux/slice/planSlice';
import { addDoc, collection, onSnapshot, orderBy , query } from 'firebase/firestore';

import { db } from '../../firebase/config';
import './checkoutSuccess.css'
const CheckoutSucess = () => {


  const dispatch = useDispatch()

const useremail = useSelector(selectUserEmail);
  // const plan  = useSelector(Selectplan)
  const planss  = useSelector(SelectPlanss)

useEffect(() => {
  if(useremail){

    const q = query(collection(db, 'subscription'),orderBy("createdAt", "asc"));
    
     onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({...doc.data() , id:doc.id});
      });
      const search = products?.find((product) => product.email === useremail)
      addToFirebase(search)  
    });
  }

}, [planss.name, useremail])


const addToFirebase = (search) => {



  
  if(!search){

    const today = new Date(Date.now());
    let endDay = new Date(Date.now());
     endDay = new Date(endDay.setDate(endDay.getDate() + 30));


  try {
    addDoc(collection(db, "subscription"), {
      email: useremail,

  plan: planss.name,

  duration: "Month",
      createdAt: today.toLocaleDateString(),
      endAt: endDay.toLocaleDateString()
    });
  } catch (error) {}
}
}
















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













  return (
    <div className="success-container">
    <div className="printer-top"></div>
      
    <div className="paper-container">
      <div className="printer-bottom"></div>
  
      <div className="paper">
        <div className="main-contents">
          <div className="success-icon">&#10004;</div>
          <div className="success-title">
            Payment Complete
          </div>
          <div className="success-description">
            <h3 style={{color:"black"}}>{useremail}</h3>
            <h4 style={{color:"black"}}>{planss.name}</h4>
            <h6 style={{color:"black"}}>&euro; {planss.price}</h6>
          </div>
          <div className="order-details">
            <div className="order-number-label">Order Number</div>
            <div className="order-number">123456789</div>
          </div>
          <div className="order-footer">Thank you!</div>
        </div>
        <div className="jagged-edge"></div>
      </div>
    </div>
  </div>
  )
}

export default CheckoutSucess