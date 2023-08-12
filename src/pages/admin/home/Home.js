import React from 'react'
import useFetchHook from '../../../hooks/useFetchHook';
import './home.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
const Home = () => {
  const data = useFetchHook("subscription");



const handleFinishSub = (item) => {


  try {
    deleteDoc(doc(db, "subscription", item.id));
   console.log(item);
   console.log(item.id);

} catch (error) {
   
}








}

  return (
    <div className='admin-home py-4'>
        <div className='container'>
          <table className='styled-table'>
  <thead>
    <tr>
      <th>Email</th>
      <th>Plan</th>
      <th>Created At</th>
      <th>Duration</th>
      <th>End At</th>
    </tr>
  </thead>
  <tbody>
{data?.map( (item , index) =>{

const today = new Date(Date.now());

const date1 = new Date(item.endAt);
    const date2 = new Date(today);

if(date2 >= date1){
  
handleFinishSub(item)

}




  return(
    <tr key={index}>
        <td>{item.email}</td>
        <td>{item.plan}</td>
        <td>{item.createdAt}</td>
        <td>{item.duration}</td>
        <td>{item.endAt}</td>
      </tr>
  )})}    

  
  </tbody>
</table>
  





        
        
        </div>
        
        </div>
  )
}

export default Home