import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './CurrentWeather.module.css';

export default function CurrentWeather({ className, data, ...restProps }) {
    const units = useSelector((state) => state.units);
    
    return (
        <div
            className={className ? [styles.wrap, className].join(' ') : styles.wrap}
            {...restProps}
        >
            <img 
                className={styles.img}
                src={utils.getWeatherIconSrc(data.weather[0].icon)} 
                alt="" 
            />
            <span className={styles.temp}>
                {utils.getTemp(data.main.temp, units, true)}
            </span>
            <span className={styles.description}>
                {data.weather[0].description}
            </span>
        </div>
    )
}