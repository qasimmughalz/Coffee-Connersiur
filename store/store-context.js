
import {  createContext, useReducer } from "react";


export const Actions = {
    SET_LAT_LONG : 'Set_lang_long',
    SET_Coffee : 'Coffee_List',
  }
  
  export const StoreReducer = (state, action)=>{
    switch (action.type) {
      case Actions.SET_LAT_LONG:{
          return {
            ...state, latlong: action.payload.latlong
          }
      }
      case Actions.SET_Coffee:{
          return {
            ...state, coffeeShops: action.payload.coffeeShops
          }
      }
      default:
        break;
    }
  }
  
  export const StoreContext = createContext();
  

  export const Store = ({children})=>{
    const initialStates = {
      latlong: '',
      coffeeShops: []
    }
  
    const [state, dispatch] = useReducer(StoreReducer, initialStates)
  
    return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>)
  }

  
  export default Store