const DADATA_SUGGESTIONS_BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const LOCAL_STORAGE_KEY = 'weather';

const LANG = {
    EN: 'en', 
    RU: 'ru', 
    UA: 'ua', 
}

const UNITS = {
    IMPERIAL: 'imperial', 
    METRIC: 'metric', 
}

const PRESSURE_PREFIX = {
    HPA: 'hPa', 
    MMHG: 'мм. рт. ст.', 
}

const VISIBILITY_PREFIX = {
    IMPERIAL: {
        [LANG.RU]: 'Миль', 
        [LANG.UA]: 'Миль', 
        [LANG.EN]: 'Mi', 
    }, 
    METRIC: {
        [LANG.RU]: 'Км', 
        [LANG.UA]: 'Км', 
        [LANG.EN]: 'Km', 
    }, 
}

const HUMIDITY_PREFIX = {
    IMPERIAL: '%', 
    METRIC: '%', 
}

export {
    DADATA_SUGGESTIONS_BASE_URL, 
    OPEN_WEATHER_BASE_URL, 
    LOCAL_STORAGE_KEY, 
    LANG, 
    UNITS, 
    PRESSURE_PREFIX, 
    VISIBILITY_PREFIX, 
    HUMIDITY_PREFIX, 
}