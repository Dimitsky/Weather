import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../js/consts';

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.favorites || [];

const favoritesSlice = createSlice({
    name: 'favorites', 
    initialState, 
    reducers: {
        addFavorites: (state, action) => {
            state.push(action.payload);
        }, 
        removeFavorites: (state, action) => {
            return state.filter((fav) => {
                return fav.lat !== action.payload.lat && fav.lon !== action.payload.lon;
            })
        }
    }, 
});

export const { addFavorites, removeFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;