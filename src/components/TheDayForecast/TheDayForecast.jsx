import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './TheDayForecast.module.css';

export default function TheDayForecast({ className, data, title, ...restProps }) {
    const lang = useSelector((state) => state.lang);

    return (
        <div
            className={className ? [styles.daily, className].join(' ') : styles.daily}
            {...restProps}
        >
            {
                title && (
                    <h2>
                        {title}
                    </h2>
                )
            }
            <div>
                <span>
                    pressure
                </span>
                <span>
                    {
                        utils.getPressure(utils.getAveragePressure(data), lang, true)
                    }
                </span>
            </div>
            <div>
                <span>
                    visibility
                </span>
                <span>
                    {
                        utils.getVisibility(utils.getAverageVisibility(data), lang, true)
                    }
                </span>
            </div>
            <div>
                <span>
                    humidity
                </span>
                <span>
                    {
                        utils.getHumidity(utils.getAverageHumidity(data), lang, true)
                    }
                </span>
            </div>
            <ul>
                {
                    data.map((forecast) => (
                        <li
                            key={forecast.dt_txt}
                        >
                            <img 
                                src={utils.getWeatherIconSrc(forecast.weather[0].icon)} 
                                alt="weather icon"
                            />
                            <span>
                                {utils.getTemp(forecast.main.temp, lang, true)}
                            </span>
                            <span>
                                {utils.getHours(new Date(forecast.dt * 1000), lang)}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}