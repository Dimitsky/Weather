import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../js/consts';
import { LANG } from '../../js/consts';

const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))?.lang || LANG.RU;

const langSlice = createSlice({
    name: 'lang', 
    initialState, 
    reducers: {
        setLang: (state, action) => {
            return action.payload
        }
    }
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;