import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentLocation, setCurrentLocation } from '../../redux/currentLocationSlice/currentLocationSlice';
import { removeFavorites } from '../../redux/favoritesSlice/favoritesSlice';
import utils from '../../js/utils';

import styles from './PreviewWeather.module.css';
import { IconCancelFill, IconGeoFill } from '../Icon/Icon';

export default function PreviewWeather({ className, children, data, editMode, ...restProps }) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const currentLocation = useSelector((state) => state.currentLocation);
    const units = useSelector((state) => state.units);
    const lang = useSelector((state) => state.lang);

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
            className={className ? [styles.wrap, className].join(' ') : styles.wrap}
            {...restProps}
        >
            {
                editMode && (
                    <div className={styles.btnWrap}>
                        {
                            !utils.coordsIsEquil(currentLocation, data.coord) && (
                                <button
                                    className={[styles.btn, styles.deleteBtn].join(' ')}
                                    aria-label="Удалить"
                                    onClick={handleDelete}
                                >
                                    <IconCancelFill className={styles.iconCancel}/>
                                </button>
                            )
                        }
                        <button
                            className={[styles.btn, styles.currentBtn].join(' ')}
                            aria-label="Текущая позиция"
                            onClick={handleSetCurrent}
                        >
                            <IconGeoFill className={utils.coordsIsEquil(currentLocation, data.coord) ? [styles.iconGeo, styles.iconGeoActive].join(' ') : styles.iconGeo}/>
                        </button>
                    </div>
                )
            }
            <Link 
                className={styles.body}
                to={`/location?lat=${parseFloat(data.coord.lat).toFixed(3)}&lon=${parseFloat(data.coord.lon).toFixed(3)}`}
            >
                <span className={styles.name}>
                    {data.name}
                </span>
                <span className={styles.temp}>
                    {utils.getTemp(data.main.temp, units)}
                </span>
                <span className={styles.time}>
                    {utils.getUTCTime(data.dt + data.timezone, lang, true)}
                </span>
                <span className={styles.description}>
                    {data.weather[0].description}
                </span>
                {
                    utils.coordsIsEquil(currentLocation, data.coord) ? (
                        <span className={styles.currentLocation}>
                            Текущая позиция
                        </span>
                    ) : (
                        null
                    )
                }
            </Link>
        </div>
    )
}