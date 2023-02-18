import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './NowForecast.module.css';

export default function NowForecast({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    
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
                {utils.getTemp(data.main.temp, lang)}
            </span>
            <span className={styles.description}>
                {data.weather[0].description}
            </span>
        </div>
    )
}