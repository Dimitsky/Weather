import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './DetailedForecast.module.css';

export default function DetailedForecast({ className, data, title, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    const units = useSelector((state) => state.units);

    return (
        <div
            className={className ? [styles.wrap, className].join(' ') : styles.wrap}
            {...restProps}
        >
            {
                title && (
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                )
            }
            <div className={styles.boxWrap}>
                <div className={styles.box}>
                    <span className={styles.subtitle}>
                        давление
                    </span>
                    <span className={styles.value}>
                        {
                            utils.getPressure(utils.getAveragePressure(data), lang, true)
                        }
                    </span>
                </div>
                <div className={styles.box}>
                    <span className={styles.subtitle}>
                        видимость
                    </span>
                    <span className={styles.value}>
                        {
                            utils.getVisibility(utils.getAverageVisibility(data), lang, true)
                        }
                    </span>
                </div>
                <div className={styles.box}>
                    <span className={styles.subtitle}>
                        влажность
                    </span>
                    <span className={styles.value}>
                        {
                            utils.getHumidity(utils.getAverageHumidity(data), lang, true)
                        }
                    </span>
                </div>
            </div>
            <ul className={styles.list}>
                {
                    data.map((forecast) => (
                        <li
                            key={forecast.dt_txt}
                            className={styles.item}
                        >
                            <img 
                                className={styles.img}
                                src={utils.getWeatherIconSrc(forecast.weather[0].icon)} 
                                alt="weather icon"
                            />
                            <span className={styles.temp}>
                                {utils.getTemp(forecast.main.temp, units)}
                            </span>
                            <span className={styles.hours}>
                                {`${utils.getHours(forecast.dt, lang)}:00`}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}