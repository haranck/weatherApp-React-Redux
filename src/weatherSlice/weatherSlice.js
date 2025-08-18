import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchWeather = createAsyncThunk('weather/fetching', async (city,{rejectWithValue})=>{
   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
   try {
      const res =  await axios .get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      return res.data
   } catch (error) {
      return rejectWithValue(error.res.data)
   }
})

const initialState = {
   data:null,
   loading:false,
   error:null
}

const weatherSlice =  createSlice({
   name:'weather',
   initialState,
   extraReducers:(builder)=>{
      builder
      .addCase(fetchWeather.pending,(state)=>{
         state.loading = true
         state.error = null
      })
      .addCase(fetchWeather.fulfilled,(state,action)=>{
         state.loading = false
         state.data = action.payload
      })
      .addCase(fetchWeather.rejected,(state)=>{
         state.loading = false
         state.error = 'City Not Found'
      })
   }
})

export default weatherSlice.reducer