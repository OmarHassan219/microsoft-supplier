import React, { useEffect } from 'react'
import Hero from '../../components/hero/Hero'
import './home.css'
import Mss from '../../components/mssSection/Mss'
// import { useSelector } from 'react-redux'
// import useFetchHook from '../../hooks/useFetchHook'
// import ProductCard from '../../components/productCard/ProductCard'
// import { Link } from 'react-router-dom'
import Plans from '../../components/plans/Plans'
import { useDispatch } from 'react-redux'
import { CLOSE_LOADING, OPEN_LOADING } from '../../redux/slice/loadingSlice'

const Home = () => {

const dispatch = useDispatch()
  

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
    <div className='home'>
      <Hero/>
      <div className='why-us-section'>
<p>Transparent</p>
<p>Reliable</p>
<p>Connecting</p>
      </div>
      <Mss/>
      <Plans/>
      <div className='contact-section '>
        <div className='container d-flex flex-column align-items-start'>

<p><b>Contact us to view our brochure with a detailed exposition of the benefits.</b></p>
<div>

<p>If you want to ensure that you gain access to the best software, we bring you supplier plans that convey some incredible benefits and a tremendous value. Every business partner and client are able to use supplier plans and gain access to various advantages. These are designed to help you enhance the return on investment overtime.

</p>
<p>One thing to consider about supplier plans is that they are not mandatory to order products. However, they provide a great convenience. You receive benefits like dropshipping to your customers, discounts ranging from 5% to 15%. Additionally, we offer inventory control and also customizable plans, based on the package you choose.</p>
<p>
If you want to obtain tremendous quality and more value for any of the supplier plans, don’t hesitate and give these a try. We are here to assist with any questions that you may have, so don’t hesitate to get in touch right away!
</p>
</div>

      </div>
        </div>
      <Mss/>
<div id='contact' className='talk-to-us'>
  <div className='container'>
    <p>Talk To Us</p>
    <a href='mailto:info@microsoftsupplier.com'>info@microsoftsupplier.com</a>
  </div>
</div>
    </div>
  )
}

export default Home