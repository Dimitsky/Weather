import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './NowForecast.module.css';

export default function NowForecast({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    
    return (
        <div
            className={className ? [styles.now, className].join(' ') : styles.now}
            {...restProps}
        >
            <img 
                src={utils.getWeatherIconSrc(data.weather[0].icon)} 
                alt="" 
            />
            <p>
                {utils.getTemp(data.main.temp, lang)}
            </p>
            <p>
                {data.weather[0].description}
            </p>
        </div>
    )
}