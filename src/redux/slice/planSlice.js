import { createSlice } from '@reduxjs/toolkit'

const initialState = {
plan: null , 
price: localStorage.getItem('price') ? parseFloat((localStorage.getItem('price'))) : null , 
planss: localStorage.getItem('planss') ? JSON.parse(localStorage.getItem('planss')) : null ,

}

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
SET_CHOOSEN_PLAN(state , action){
const {plan , price  } = action.payload
console.log(action.payload);
state.plan = action.payload
state.price = price 
localStorage.setItem('price' , state.price)
state.planss = plan
localStorage.setItem('planss' , JSON.stringify(state.planss))




}



  }
});

export const {SET_CHOOSEN_PLAN} = planSlice.actions
export const Selectplan = state =>  state.plan.plan
export const Selectprice = state =>  state.plan.price
export const SelectPlanss = state =>  state.plan.planss

export default planSlice.reducer