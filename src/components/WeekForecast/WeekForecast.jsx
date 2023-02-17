import { useSelector } from 'react-redux';
import utils from '../../js/utils';
import TheDayForecast from '../TheDayForecast/TheDayForecast';
import styles from './WeekForecast.module.css';

export default function WeekForecast({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    const dailyForecast = {};

    // 
    data.list.forEach((forecast) => {
        const dt = new Date(forecast.dt * 1000);

        if (dailyForecast[dt.getMonth() + '' + dt.getDate()]) {
            dailyForecast[dt.getMonth() + '' + dt.getDate()].push(forecast);
        } else {
            dailyForecast[dt.getMonth() + '' + dt.getDate()] = [forecast];
        }
    })

    return(
        <div
            className={className ? [styles.week, className].join(' ') : styles.week}
            {...restProps}
        >
            <h2>
                На 5 дней
            </h2>
            <ul>
                {
                    Object.keys(dailyForecast).map((key) => (
                        <li
                            key={dailyForecast[key][0].dt}
                        >
                            <header>
                                <span>
                                    {utils.getTheDayOfWeek(new Date(dailyForecast[key][0].dt * 1000), lang).slice(0, 3)}
                                </span>
                                <div>
                                    <span>
                                        {utils.getMaxTemp(dailyForecast[key])}
                                    </span>
                                    <span>
                                        {utils.getMinTemp(dailyForecast[key])}
                                    </span>
                                </div>
                                <div>
                                    <img 
                                        src={utils.getWeatherIconSrc(dailyForecast[key][0].weather[0].icon)} 
                                        alt="" 
                                    />
                                    <span>
                                        {dailyForecast[key][0].weather[0].description}
                                    </span>
                                </div>
                            </header>
                            <div>
                                <TheDayForecast 
                                    key={dailyForecast[key][0].dt} 
                                    data={dailyForecast[key]}
                                />
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}