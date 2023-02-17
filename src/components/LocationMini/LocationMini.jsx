import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentLocation, setCurrentLocation } from '../../redux/currentLocationSlice/currentLocationSlice';
import { removeFavorites } from '../../redux/favoritesSlice/favoritesSlice';
import utils from '../../js/utils';

import styles from './LocationMini.module.css';

export default function LocationMini({ className, children, data, ...restProps }) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const currentLocation = useSelector((state) => state.currentLocation);

    const handleDelete = () => {
        dispatch(removeFavorites(data.coord));

        // Если удаляемая локация является текущей, то очистить состояние текущей локации  
        if (utils.coordsIsEquil(currentLocation, data.coord)) {
            dispatch(removeCurrentLocation());
        }

        // Вручную обновляем кеш, чтобы обновить данные у клиента 
        queryClient.setQueryData(['favorites'], (oldData) => {
            return oldData.filter((old) => old.coord.lat !== data.coord.lat && old.coord.lon !== data.coord.lon);
        })
    }

    const handleSetCurrent = () => {
        dispatch(setCurrentLocation({
            lat: data.coord.lat, 
            lon: data.coord.lon, 
        }))
    }

    return (
        <div
            className={className ? [styles.body, className].join(' ') : styles.body}
            {...restProps}
        >
            <button
                className={styles.delete}
                onClick={handleDelete}
            >
                delete
            </button>
            <button
                onClick={handleSetCurrent}
            >
                current
            </button>
            <div>
                <p>
                    {data.name}
                    {
                        utils.coordsIsEquil(currentLocation, data.coord) ? (
                            <>
                                {'Текущая позиция'}
                            </>
                        ) : (
                            null
                        )
                    }
                </p>
                <p>
                    {data.main.temp}
                </p>
                <p>
                    {data.dt}
                </p>
                <p>
                    {data.weather[0].description}
                </p>
                <p>
                    {data.main.temp_min}
                </p>
                <p>
                    {data.main.temp_max}
                </p>
            </div>
        </div>
    )
}