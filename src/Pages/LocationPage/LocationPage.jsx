import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from '../../redux/favoritesSlice/favoritesSlice';
import PageError from "../../components/PageError/PageError";
import PageLoader from "../../components/PageLoader/PageLoader";
import useWeather from "../../hooks/useWeather";
import utils from '../../js/utils';
import { setCurrentLocation } from "../../redux/currentLocationSlice/currentLocationSlice";
import { removeCurrentLocation } from "../../redux/currentLocationSlice/currentLocationSlice";

export default function Location() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const currentLocation = useSelector((state) => state.currentLocation);
    const searchParams = new URLSearchParams(document.location.search);
    const { data, error, status } = useWeather({
        lat: searchParams.get('lat'), 
        lon: searchParams.get('lon'), 
        weatherType: 'weather', 
    })

    const handleAddToFavorites = () => {
        dispatch(addFavorites({
            lat: data.coord.lat, 
            lon: data.coord.lon, 
        }));

        // Если текущая локация не задана, то сделать текущей новую локацию 
        if (!currentLocation.lat && !currentLocation.lon) {
            dispatch(setCurrentLocation(data.coord));
        }
    }

    const handleRemoveFromFavorites = () => {
        dispatch(removeFavorites({
            lat: data.coord.lat, 
            lon: data.coord.lon, 
        }))

        // Если удаляемая локация является текущей, то очистить состояние текущей локации  
        if (utils.coordsIsEquil(currentLocation, data.coord)) {
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
        console.log(data);

        return (
            <>
                {
                    favorites.find((location) => utils.coordsIsEquil(location, data.coord)) ? (
                        <button
                            onClick={handleRemoveFromFavorites}
                        >
                            Удалить из избранного
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToFavorites}
                        >
                            Добавить в избранное
                        </button>
                    )
                }
                <p>
                    {data.name}
                </p>
                <p>
                    {data.main.temp}
                </p>
                <p>
                    {data.weather[0].description}
                </p>
            </>
        )
    }
}