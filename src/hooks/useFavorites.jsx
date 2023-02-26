import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import ApiOpenWeather from "../js/ApiOpenWeather"
import { OPEN_WEATHER_TOKEN } from "../js/config"
import { OPEN_WEATHER_BASE_URL } from "../js/consts"

export default function useFavorites() {
    const lang = useSelector((state) => state.lang);
    const units = useSelector((state) => state.units);
    const favorites = useSelector((state) => state.favorites);

    const handler = () => {
        const api = new ApiOpenWeather({
            token: OPEN_WEATHER_TOKEN, 
            baseUrl: OPEN_WEATHER_BASE_URL, 
            lang, 
            units, 
        })

        return api.getDatas(favorites);
    }

    return useQuery({
        queryKey: ['favorites', {lang, units}], 
        queryFn: handler, 
        refetchOnWindowFocus: false, 
    })
}