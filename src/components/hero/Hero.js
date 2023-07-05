import React from 'react'
import './hero.css'
import gif from '../../assets/logo.gif'
import microsoftsupplier from '../../assets/lettering2-1-1024x410.png'



const Hero = () => {
  return (
    <div className='hero-section'>
<div className='contianer'>
    <div className='d-flex align-items-center justify-content-center flex-wrap gap-3'>



<img    className='hero-image gif' src={gif} alt='microsoft' />



<img  className='hero-image'  src={microsoftsupplier} alt='microsoft' />



    </div>


</div>




    </div>
  )
}

export default Hero