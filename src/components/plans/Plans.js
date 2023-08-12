import React, { useEffect, useState } from 'react'
import './plans.css'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CHOOSEN_PLAN, SelectPlanss } from '../../redux/slice/planSlice'
import { useNavigate } from 'react-router-dom'
import { selectUserEmail } from '../../redux/slice/authSlice'
import  toast  from 'react-hot-toast'
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import { db } from '../../firebase/config'
import Form from '../../components/form/Form'
const Plans = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const useremail = useSelector(selectUserEmail)
const [emailcheck, setEmailcheck] = useState(useremail)
const planss = useSelector(SelectPlanss)
const [exist, setexist] = useState('')
const [contactForm, setContactForm] = useState(false)


const handlePlan = (plan) => {
const {name , price} = plan


if(emailcheck === null){
    toast.error('Sign in to procceed')  
    
    
    
    navigate('/Sign-in')
}else{
    
    dispatch(
        SET_CHOOSEN_PLAN({
            name , 
            price , 
            plan
        })
    )
    console.log(emailcheck);
    navigate('/checkout')



}

}



useEffect(() => {
    if(useremail){
  
      const q = query(collection(db, 'subscription'),orderBy("createdAt", "asc"));
      
       onSnapshot(q, (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({...doc.data() , id:doc.id});
        });
        const search = products?.find((product) => product.email === useremail)
        setexist(search)  
      });
    }
  
  }, [planss.name, useremail])
  
  
//   const addToFirebase = (search) => {
  
  
  
    
    
//   }



const handleGigaPlan = ()=>{
     setContactForm(true)
}
















    const plans = [

{
    name:'nanoSupplier Plan',
    price: '99.99',
    duration: '/ Month',
    'Discount Physical': '5%',
    'Discount Digital': '20%',
    'Free Physical Units Per Order':'5',
    Inventory: '❌',
    'Customizable Plan':'❌',
    'VA-RSPC Pricing Consultation':'❌',
    'Dropship To Your Customers':'✅',
},
{
    name:'kiloSupplier Plan',
price: '1249.99',
duration: '/ Month',

    'Discount Physical': '10%',
    'Discount Digital': '25%',
    'Free Physical Units Per Month':'20',
    'Free Physical Units Per Order':'5',
    Inventory: '✅',
    'Customizable Plan':'✅',
    'VA-RSPC Pricing Consultation':'❌',
    'Dropship To Your Customers':'✅',
},
{
    name:'gigaSupplier Plan',
price: '',
duration: '',

    'Discount Physical': '21%',
    'Discount Digital': '30%',
    'Free Physical Units Per Month':'100',
    'Free Physical Units Per Order':'20',
    Inventory: '✅',
    'Customizable Plan':'✅',
    'VA-RSPC Pricing Consultation':'✅',
    'Dropship To Your Customers':'✅',
},
    ]


  return (
    <div id='plan' className='plans'>
        <div className='containerr overflow-hidden'>
        {contactForm ? <Form  setContactForm={setContactForm} /> : null}

<h1 className='text-center text-light'>Supplier Plans</h1>
<div className='row m-0 mt-4 gap-3 p-3 justify-content-center'>



{plans.map((plan, index) => (
    

<div  key={index} className={`col-lg-3 col-md-5 col-sm-5 col-xs-12 plan ${planss?.name === plan?.name && exist ? 'subscribed' : ''}   `}>
    {/* {planss.name === plan.name ? <MdOutlineStar size={26} style={{float:"left"}}/> : ''} */}
<h3 className='mb-5 mt-2'>{plan?.name}</h3>

<h4 className='price'>{`${plan?.name.includes('gigaSupplier') ? "" : '€' } ${plan.price}`}</h4>

<div className='p-4 plan-text'>

<h4 className='duration '>{`${plan.duration}`}</h4>

<div className='border-bottom mb-3 mt-5'>
<p>{ `Discount Per Physical Unit - ${plan['Discount Physical']}`}</p>
<p>{ `Discount Per Digital Unit - ${plan['Discount Digital']}`}</p>
</div>
<div className='other-features'>
<p>{ `${plan['Free Physical Units Per Order']} Free Physical Units Per Order `}</p>
{plan['Free Physical Units Per Month'] ?                  
<p>{ `${plan['Free Physical Units Per Month']} Free Physical Units Per Month `}</p>
:
null
}
<p>{ ` Inventory Control ${plan.Inventory}`}</p>
<p>{ ` Customizable Plan ${plan['Customizable Plan']}`}</p>
<p>{ `VA-RSPC Pricing Consultation ${plan['VA-RSPC Pricing Consultation']}`}</p>
<p>{ `Dropship To Your Customers ${plan['Dropship To Your Customers']}`}</p>
</div>
</div>

{exist  ?
    ""
:
plan?.name !== 'gigaSupplier Plan' && !exist  ?
<button type='btton' onClick={() => handlePlan(plan)}>Buy</button>
: 
<button type='btton' onClick={() => handleGigaPlan(plan)}>Contact</button>

}
</div>
    
    ))}

    </div>
        </div>


    </div>
  )
}

export default Plans