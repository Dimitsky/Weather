import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ApiOpenWeather from "../js/ApiOpenWeather";

import { OPEN_WEATHER_TOKEN } from "../js/config"
import { OPEN_WEATHER_BASE_URL } from "../js/consts"

export default function useWeather({ lat, lon, weatherType = 'weather'}) {
    const lang = useSelector((state) => state.lang);
    const units = useSelector((state) => state.units);

    const handler = () => {
        const options = {
            token: OPEN_WEATHER_TOKEN, 
            baseUrl: OPEN_WEATHER_BASE_URL, 
            weatherType, 
            lang: lang, 
            units: units, 
        }

        const api = new ApiOpenWeather(options);

        return api.getData(lat, lon);
    }

    return useQuery({
        queryKey: [weatherType, {lat, lon, lang, units}], 
        queryFn: handler, 
        refetchOnWindowFocus: false, 
    })
}