import React, { useEffect, useState } from 'react'
import './signin.css'
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import  toast  from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER, selectCurrentPathname } from '../../redux/slice/authSlice';

const Signin = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
       
      });
const currentPathname = useSelector(selectCurrentPathname);
const handleForgetPass = () =>{
if(formValues.email === ""){
    toast.error('Write Your Email and click on Forgot Password again', {
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
}else{
    sendPasswordResetEmail(auth, formValues.email)
  .then(() => {
    // Password reset email sent!
    // ..
    toast.success('Password Reset Email Sent (Check your Junk Folder)', {
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
        
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error('Error: Failed to Send Password Reset Email', {
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
    // ..
  });
}

}




    const handleSignin = ( e ) => {
const {name, value} = e.target
setFormValues({...formValues, [name]: value})

    }


const handleSubmit = (e) => {
  e.preventDefault()
  console.log(formValues)
  signInWithEmailAndPassword(auth, formValues.email, formValues.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // dispatch
dispatch(SET_ACTIVE_USER({
    email: user.email,
    userPhoto: user.photoURL,
    userName: user.displayName,
    userId: user.uid,
    
}))



    toast.success('Signed In Successfully', {
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
setFormValues({...formValues, email: '', password: ''})
if(currentPathname){
  navigate(currentPathname)
}else
navigate('/');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(`Email Address/Password is not correct`, {
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
setFormValues({...formValues, email: '', password: ''})






  });
}





useEffect(() => {
    if(formValues.password.length < 8 && formValues.password.length !== 0){
        document.querySelector(".pop-password-message").style.display = "block";
    }else  
    document.querySelector(".pop-password-message").style.display = "none";
}, [formValues.password])



  return (
    <div className="login-container">
  <form onSubmit={handleSubmit}>
    <div className="form-container">
      <div className="form-sections mb">
        <div className="heading-container">
          <h1 className="heading">Sign In</h1>
        </div>
      </div>
      <div className="form-sections">
        <div className="form-fields">
          <label for="email">Email</label>
          <input type="email" name="email" value={formValues.email} id="email" onChange={(e) => handleSignin(e)} className="input-field" tabindex="1" required />
        </div>
        <div className="form-fields">
          <label for="pass">Password</label>
          {/* <div id="pass-field-container"> */}

            <input type="password" name="password" value={formValues.password} id="pass" onChange={(e) => handleSignin(e)} className="input-field" required tabindex="2" />
            <p className='pop-password-message' style={{fontSize:"11px" , color:"red" , display:"none"}} >Password should be 8 characters or more</p>
         
          
        </div>
        <div className="form-fields">
          <input type="submit" value="Sign In" className="login-btn" tabindex="4" />
        </div>
      </div>
      <div className="form-sections">
        <div className="forgot-password"><button type='button' onClick={handleForgetPass} >Forgot Password?</button></div>
      <Link to='/register'>Do not have an account ? </Link>
      </div>
    </div>
  </form>
</div>
  )
}

export default Signin