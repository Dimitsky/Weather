import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../js/consts';

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.currentLocation || {};

const currentLocationSlice = createSlice({
    name: 'currentLocation', 
    initialState, 
    reducers: {
        setCurrentLocation: (state, action) => {
            return action.payload;
        }, 
        removeCurrentLocation: () => {
            return {}
        }
    }
})

export const { setCurrentLocation, removeCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;