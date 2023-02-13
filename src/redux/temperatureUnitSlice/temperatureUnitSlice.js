import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY, TEMPERATURE_UNITS } from "../../js/consts";

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.temperatureUnit || TEMPERATURE_UNITS.CELSIUS;

const temperatureUnitSlice = createSlice({
    name: 'temperatureUnit', 
    initialState, 
    reducers: {
        chooseCelsius: (state, action) => {
            return TEMPERATURE_UNITS.CELSIUS;
        }, 
        chooseFahrenheit: (state, action) => {
            return TEMPERATURE_UNITS.FAHRENHEIT;
        }
    }
})

export const { chooseCelsius, chooseFahrenheit } = temperatureUnitSlice.actions;

export default temperatureUnitSlice.reducer;