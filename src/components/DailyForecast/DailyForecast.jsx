import { useSelector } from 'react-redux';
import utils from '../../js/utils';
import TheDayForecast from '../DetailedForecast/DetailedForecast';
import { Accordion, AccordionItem } from '../Accordion/Accordion';

import styles from './DailyForecast.module.css';

export default function DailyForecast({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    const units = useSelector((state) => state.units);
    const dailyForecast = {};

    // 
    data.list.forEach((forecast) => {
        const dt = new Date(forecast.dt * 1000);
        const month = dt.getMonth();
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        
        if (dailyForecast[month + date]) {
            dailyForecast[month + date].push(forecast);
        } else {
            dailyForecast[month + date] = [forecast];
        }
    })

    return (
        <div
            className={className ? [styles.week, className].join(' ') : styles.week}
            {...restProps}
        >
            <h2 className={styles.title}>
                На 5 дней
            </h2>
            <Accordion>
                {
                    Object.keys(dailyForecast).map((key) => (
                            <AccordionItem 
                                key={key}
                                itemKey={key}
                                title={
                                    <div
                                        className={styles.item}
                                    >
                                        <span className={styles.day}>
                                            {utils.getTheDayOfWeek(new Date(dailyForecast[key][0].dt * 1000), lang).slice(0, 3)}
                                        </span>
                                        <div className={styles.tempWrap}>
                                            <span className={styles.maxTemp}>
                                                {utils.getTemp(utils.getMaxTemp(dailyForecast[key]), units)}
                                            </span>
                                            <span className={styles.minTemp}>
                                                {utils.getTemp(utils.getMinTemp(dailyForecast[key]), units)}
                                            </span>
                                        </div>
                                        <div className={styles.descriptionWrap}>
                                            <img 
                                                className={styles.img}
                                                src={utils.getWeatherIconSrc(dailyForecast[key][(dailyForecast[key].length / 2).toFixed(0) - 1].weather[0].icon)} 
                                                alt="" 
                                            />
                                            <span className={styles.description}>
                                                {dailyForecast[key][(dailyForecast[key].length / 2).toFixed(0) - 1].weather[0].description}
                                            </span>
                                        </div>
                                    </div>
                                }
                                content={
                                    <TheDayForecast 
                                        key={dailyForecast[key][0].dt} 
                                        data={dailyForecast[key]}
                                        title={utils.getMonthName(dailyForecast[key][0].dt, lang) + ', ' + new Date(dailyForecast[key][0].dt * 1000).getDate()}
                                    />
                                }
                            />
                    ))
                }
            </Accordion>
        </div>
    )
}