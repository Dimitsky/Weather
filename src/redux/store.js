import  { configureStore } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../js/consts';
import favoritesSlice from './favoritesSlice.js/favoritesSlice';
import temperatureUnitSlice from './temperatureUnitSlice/temperatureUnitSlice';

const store = configureStore({
    favorites: favoritesSlice, 
    temperatureUnit: temperatureUnitSlice, 
});

store.subscribe(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});