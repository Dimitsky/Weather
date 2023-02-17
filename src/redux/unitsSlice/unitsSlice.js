import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../../js/consts";
import { UNITS } from '../../js/consts';

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.units || UNITS.METRIC;

const unitsSlice = createSlice({
    name: 'units', 
    initialState, 
    reducers: { 
        chooseImperial: () => {
            return UNITS.IMPERIAL;
        }, 
        chooseMetric: () => {
            return UNITS.METRIC;
        }, 
    }
})

export const { chooseImperial, chooseMetric } = unitsSlice.actions;

export default unitsSlice.reducer;