import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../weatherSlice/weatherSlice'

export const store =  configureStore({
   reducer:{
      weather:weatherReducer
   }
})