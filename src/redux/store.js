import  { configureStore } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../js/consts';
import currentLocationSlice from './currentLocationSlice/currentLocationSlice';
import favoritesSlice from './favoritesSlice/favoritesSlice';
import langSlice from './langSlice/langSlice';
import unitsSlice from './unitsSlice/unitsSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice, 
        currentLocation: currentLocationSlice, 
        lang: langSlice, 
        units: unitsSlice, 
    }
});

store.subscribe(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});