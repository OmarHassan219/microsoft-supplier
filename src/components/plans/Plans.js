import React from 'react'
import './plans.css'
const Plans = () => {

    const plans = [

{
    plan:'nanoSupplier Plan',
    price: '1111',
    duration: 'Month',
    'Discount Physical': '5%',
    'Discount Digital': '20%',
    'Free Physical Units Per Order':'5',
    Inventory: '❌',
    'Customizable Plan':'❌',
    'VA-RSPC Pricing Consultation':'❌',
    'Dropship To Your Customers':'✅',
},
{
    plan:'kiloSupplier Plan',
price: '65000',
duration: 'Year',

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
    plan:'gigaSupplier Plan',
price: '1.25M',
duration: '3 Years',

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
<h1 className='text-center text-light'>Supplier Plans</h1>
<div className='row m-0 mt-4 gap-3 p-3 justify-content-center'>



{plans.map((plan, index) => (
    

<div className='col-lg-3 col-md-5 col-sm-5 col-xs-12 plan'>
<h3 className='mb-5 mt-2'>{plan.plan}</h3>

<h4 className='price'>{plan.price}</h4>
<div className='p-4'>
<h4 className='duration mb-5'>{`/ ${plan.duration}`}</h4>
<div className='border-bottom mb-3'>
<p>{ `Discount Per Physical Unit - ${plan['Discount Physical']}`}</p>
<p>{ `Discount Per Digital Unit - ${plan['Discount Digital']}`}</p>
</div>
<div className='other-features'>
<p>{ `${plan['Free Physical Units Per Order']} Free Physical Units Per Order `}</p>
<p>{ `${plan['Free Physical Units Per Month']} Free Physical Units Per Month `}</p>
<p>{ ` Inventory Control ${plan.Inventory}`}</p>
<p>{ ` Customizable Plan ${plan['Customizable Plan']}`}</p>
<p>{ `VA-RSPC Pricing Consultation ${plan['VA-RSPC Pricing Consultation']}`}</p>
<p>{ `Dropship To Your Customers ${plan['Dropship To Your Customers']}`}</p>
</div>
</div>

</div>
    
    ))}

    </div>
        </div>


    </div>
  )
}

export default Plans