import { LANG, PRESSURE_PREFIX, VISIBILITY_PREFIX, HUMIDITY_PREFIX, UNITS } from "./consts";

const utils = {
    /*
        Переданные координаты имеют равные значения долготы и широты 
    
        формат координат: 
        {
            lat: 57.000, 
            lon: 42.000, 
        }
    */
    // Сравнивает координаты двух локаций 
    coordsIsEquil(a, b) {
        return a.lat === b.lat && a.lon === b.lon;
    }, 
    
    // Возвращает день недели для разных языков
    getTheDayOfWeek(date, lang = LANG.RU) {
        const d = date.getDay();
        const days = {
            [LANG.RU]: [
                'воскресенье', 
                'понедельник', 
                'вторник', 
                'среда', 
                'четверг', 
                'пятница', 
                'суббота', 
            ], 
            [LANG.UA]: [
                'неділя', 
                'понеділок', 
                'вівторок', 
                'середа', 
                'четвер', 
                'п\'ятниця', 
                'субота', 
            ], 
            [LANG.EN]: [
                'sunday', 
                'monday', 
                'tuesday', 
                'wednesday', 
                'thursday', 
                'friday', 
                'saturday', 
            ], 
        }
    
        return days[lang][d];
    }, 

    // 
    getTime(unixTimestamp, lang) {
        const date = new Date(unixTimestamp * 1000);
        const hours24 = date.getHours();
        let minutes = date.getMinutes();

        if (!minutes) {
            minutes = '00';
        } else if (minutes < 10) {
            minutes = '0' + minutes;
        }

        switch (lang) {
            case LANG.RU:
            case LANG.UA:
                return hours24 + ':' + minutes;
            case LANG.EN:
                const hours12 = hours24 % 12 || 12;

                return hours24 >= 12 ? hours12 + ':' + minutes + ' PM' : hours12 + ':' + minutes + ' AM';
        }
    }, 
    
    // возвращает давление в гектопаскалях или миллиметрах ртутного столба
    getPressure(pressure, lang, prefix = false) {
        switch (lang) {
            case LANG.RU: 
            case LANG.UA:
                let result = (pressure * 0.75).toFixed(0);
    
                return prefix ? result + ' ' + PRESSURE_PREFIX.MMHG : result
            case LANG.EN:
                return prefix ? pressure + ' ' + PRESSURE_PREFIX.HPA : pressure
        }
    }, 

    // 
    getUTCTime(unixTimestamp, lang, prefix = false) {
        const hours24 = (new Date(unixTimestamp * 1000)).getUTCHours();
        const minutes = new Date().getMinutes();

        switch (lang) {
            case LANG.RU:
            case LANG.UA:
                return hours24 + ':' + minutes;
            case LANG.EN:
                if (prefix) {
                    return hours24 >= 12 ? (hours24 % 12 || 12) + ':' + minutes + ' PM' : (hours24 % 12 || 12) + ':' + minutes + ' AM';
                } else {
                    return (hours24 % 12 || 12) + ':' + minutes
                }
        }
    }, 
    
    // 
    getVisibility(visibility, lang, prefix = false) {
        switch (lang) {
            case LANG.RU:
            case LANG.UA:
                const visibilityKm = (visibility / 1000).toFixed(1);
    
                return prefix ? visibilityKm + ' ' + VISIBILITY_PREFIX.METRIC[lang] : visibilityKm;
            case LANG.EN:
                const visibilityMi = (visibility * 0.000621).toFixed(1);
    
                return prefix ? visibilityMi + ' ' + VISIBILITY_PREFIX.IMPERIAL[lang] : visibilityMi;
        }
    }, 
    
    // 
    getHumidity(humidity, lang, prefix = false) {
        switch (lang) {
            case LANG.RU:
            case LANG.EN:
            case LANG.UA:
                return prefix ? humidity + ' ' + HUMIDITY_PREFIX.METRIC : humidity;
        }
    }, 
    
    // 
    getAveragePressure(data) {
        return (data.reduce((acc, forecast) => forecast.main.pressure + acc, 0) / data.length).toFixed(0);
    }, 
    
    // 
    getAverageVisibility(data) {
        return (data.reduce((acc, forecast) => forecast.visibility + acc, 0) / data.length).toFixed(0);
    }, 
    
    // 
    getAverageHumidity(data) {
        return (data.reduce((acc, forecast) => forecast.main.humidity + acc, 0) / data.length).toFixed(0);
    }, 

    getWeatherIconSrc(code) {
        return `http://openweathermap.org/img/wn/${code}@2x.png`
    }, 


    getTemp(temp, units, prefix = false) {
        switch (units) {
            case UNITS.IMPERIAL:
                return prefix ? temp.toFixed(0) + '°' + 'F' : temp.toFixed(0) + '°';
            case UNITS.METRIC:
                return prefix ? temp.toFixed(0) + '°' + 'C' : temp.toFixed(0) + '°';
        }
    }, 

    getMaxTemp(data) {
        let max = data[0].main.temp;

        data.forEach((forecast) => {
            if (forecast.main.temp > max) {
                max = forecast.main.temp;
            }
        });

        return max
    }, 

    getMinTemp(data) {
        let min = data[0].main.temp;

        data.forEach((forecast) => {
            if (forecast.main.temp < min) {
                min = forecast.main.temp;
            }
        });

        return min
    }, 

    getMonthName(unixTimestamp, lang) {
        const monthNumber = new Date(unixTimestamp * 1000).getMonth();

        switch (lang) {
            case LANG.RU:
                switch (monthNumber) {
                    case 0:
                        return 'Январь'
                    case 1:
                        return 'Февраль'
                    case 2:
                        return 'Март'
                    case 3:
                        return 'Апрель'
                    case 4:
                        return 'Май'
                    case 5:
                        return 'Июнь'
                    case 6:
                        return 'Июль'
                    case 7:
                        return 'Август'
                    case 8:
                        return 'Сентябрь'
                    case 9:
                        return 'Октябрь'
                    case 10:
                        return 'Ноябрь'
                    case 11:
                        return 'Декабрь'
                }
            case LANG.EN:
            default:
                switch (monthNumber) {
                    case 0:
                        return 'January'
                    case 1:
                        return 'February'
                    case 2:
                        return 'March'
                    case 3:
                        return 'April'
                    case 4:
                        return 'May'
                    case 5:
                        return 'June'
                    case 6:
                        return 'July'
                    case 7:
                        return 'August'
                    case 8:
                        return 'September'
                    case 9:
                        return 'October'
                    case 10:
                        return 'November'
                    case 11:
                        return 'December'
                }
        }
    }
}

export default utils;