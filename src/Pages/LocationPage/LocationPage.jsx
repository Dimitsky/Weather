import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from '../../redux/favoritesSlice/favoritesSlice';
import PageError from "../../components/PageError/PageError";
import PageLoader from "../../components/PageLoader/PageLoader";
import useWeather from "../../hooks/useWeather";
import utils from '../../js/utils';
import { setCurrentLocation } from "../../redux/currentLocationSlice/currentLocationSlice";
import { removeCurrentLocation } from "../../redux/currentLocationSlice/currentLocationSlice";
import DetailedForecast from "../../components/DetailedForecast/DetailedForecast";
import { IconCancelFill, IconPluslFill } from "../../components/Icon/Icon";

import styles from './LocationPage.module.css';
import DailyForecast from "../../components/DailyForecast/DailyForecast";
import Sun from "../../components/Sun/Sun";

export default function Location() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const currentLocation = useSelector((state) => state.currentLocation);
    const searchParams = new URLSearchParams(document.location.search);
    const { data, error, status } = useWeather({
        lat: searchParams.get('lat'), 
        lon: searchParams.get('lon'), 
        weatherType: 'forecast', 
    })

    const handleAddToFavorites = () => {
        dispatch(addFavorites({
            lat: data.city.coord.lat, 
            lon: data.city.coord.lon, 
        }));

        // Если текущая локация не задана, то сделать текущей новую локацию 
        if (!currentLocation.lat && !currentLocation.lon) {
            dispatch(setCurrentLocation(data.city.coord));
        }
    }

    const handleRemoveFromFavorites = () => {
        dispatch(removeFavorites({
            lat: data.city.coord.lat, 
            lon: data.city.coord.lon, 
        }))

        // Если удаляемая локация является текущей, то очистить состояние текущей локации  
        if (utils.coordsIsEquil(currentLocation, data.city.coord)) {
            dispatch(removeCurrentLocation());
        }
    }

    if (status === 'loading') {
        return (
            <PageLoader />
        )
    }

    if (status === 'error') {
        return (
            <PageError error={error} />
        )
    }

    if (status === 'success') {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        let todayForecast = data.list.filter((forecast) => new Date(forecast.dt * 1000) <= tomorrow);

        return (
            <div className={styles.wrap}>
                <h2 className={styles.name}>
                    {data.city.name}
                </h2>
                {
                    favorites.find((location) => utils.coordsIsEquil(location, data.city.coord)) ? (
                        <button
                            className={styles.btn}
                            aria-label="Удалить из избранного"
                            onClick={handleRemoveFromFavorites}
                        >
                            <IconCancelFill className={[styles.icon, styles.iconCancel].join(' ')}/>
                        </button>
                    ) : (
                        <button
                            className={styles.btn}
                            aria-label="Добавить в избранное"
                            onClick={handleAddToFavorites}
                        >
                            <IconPluslFill className={[styles.icon, styles.iconPlus].join(' ')}/>
                        </button>
                    )
                }

                {/* TODAY */}
                {
                    todayForecast.length ? (
                        <DetailedForecast 
                            className={styles.today}
                            data={todayForecast} 
                            title="Сегодня"
                        />
                    ) : (
                        null
                    )
                }

                {/* DAILY */}
                <DailyForecast 
                    className={styles.daily}
                    data={data}
                />

                {/* SUN */}
                <Sun 
                    className={styles.sun}
                    sunriseUnixTimestamp={data.city.sunrise}
                    sunsetUnixTimeStamp={data.city.sunset}
                />
            </div>
        )
    }
}