import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../../js/consts";
import { UNITS } from '../../js/consts';

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.units || UNITS.METRIC;

const unitsSlice = createSlice({
    name: 'units', 
    initialState, 
    reducers: { 
        setUnits: (state, action) => {
            return action.payload
        }
    }
})

export const { setUnits } = unitsSlice.actions;

export default unitsSlice.reducer;