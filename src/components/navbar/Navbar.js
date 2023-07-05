import React, { useEffect, useState } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import {  Link, NavLink, useNavigate } from'react-router-dom'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectUserEmail, selectUserName } from '../../redux/slice/authSlice'
import {BiUserCircle} from 'react-icons/bi'
import {PiShoppingCartLight} from 'react-icons/pi'
import {IoIosMenu} from 'react-icons/io'
import {HashLink} from 'react-router-hash-link'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyroute'

const Navbar = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user)
  setUserSignedIn(true)
  dispatch(
    SET_ACTIVE_USER({
      email: user.email,
      userPhoto: user.photoURL,
      userName: user.displayName,
      userId: user.uid,
    })
  );
  
  } else {
        // User is signed out
        // ...
        console.log('User is signed out')
        setUserSignedIn(false)
  
      }
    });
  }, [])
 const userName = useSelector(selectUserName)
 const userFullEmail = useSelector(selectUserEmail)
 const UserCutEmail = userFullEmail?.slice(0, userFullEmail.indexOf('@'))
  
const [userSignedIn, setUserSignedIn] = useState(false)

const handleSignout = () => {
  
  signOut(auth).then(() => {
    // Sign-out successful.
dispatch(
REMOVE_ACTIVE_USER()
)



    toast.success('Sign-out successful', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });

navigate('/')



  }).catch((error) => {
    // An error happened.
    toast.error(error.message, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  });



}




const handleMenu = () => {
const menu = document.querySelector('.navbar-links')
if(menu.style.display === 'flex' && window.innerWidth <= 1025 ){
menu.style.display = 'none'
}else {
  console.log(window.innerWidth);
  menu.style.display = 'flex'
}

}




  return (
    <div className='navbarr d-flex justify-content-center  '>
      <div className='text-center d-flex align-items-center flex-wrap '>
        <AdminOnlyLink>

        <Link className='nav-admin' to='/admin/home' >
Admin
        </Link>
        </AdminOnlyLink>
        <Link to='/' >
<img className='logo-img ' src={logo} alt='Microsoft Supplier'/>
</Link>

<div className='d-flex align-items-center justify-content-between'>
<div className='navbar-links-container'>
<IoIosMenu onClick={handleMenu} className='menu-icon me-4' size={37}/>
<div className='navbar-links'>
<NavLink  to='/' >
home
</NavLink>
<NavLink to='/about-us' >
about us
</NavLink>
<NavLink to='shop' >
shop
</NavLink>
<HashLink smooth to='/#plan' >
supplier plan
</HashLink>
<HashLink smooth to='/#contact' >
contact
</HashLink>
</div>
</div>

{userSignedIn ? 


<div className=' user-container  d-flex  align-items-start'>
  <BiUserCircle className='user-icon' size={25}/>
  <div className=' username-signout '>
<p className='mb-0 ms-1 username'>
  {userName  ? userName : UserCutEmail}</p>
<button  onClick={handleSignout} className='navbar-btn'>
  Sign Out
</button>
  </div>
</div>



:


<Link  to='/Sign-in' className='navbar-btn-in'>
  Sign In
</Link>

}
<div className='cart'>
  <PiShoppingCartLight  size={25} className='ms-4 cart-icon'/>
  <p className='cart-count'>0</p>
</div>
</div>

      </div>
    </div>
  )
}

export default Navbar