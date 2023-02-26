import { useSelector } from 'react-redux';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import PageError from '../../components/PageError/PageError';
import PageLoader from '../../components/PageLoader/PageLoader';
import useWeather from '../../hooks/useWeather';
import utils from '../../js/utils';
import DailyForecast from '../../components/DailyForecast/DailyForecast';
import Sun from '../../components/Sun/Sun';

import styles from './HomePage.module.css';
import DetailedForecast from '../../components/DetailedForecast/DetailedForecast';

export default function HomePage() {
    const lang = useSelector((state) => state.lang);
    const currentLocation = useSelector(state => state.currentLocation);
    
    const { data: currentWeather, error: currentWeatherError, status: currentWeatherStatus } = useWeather({
        ...currentLocation, 
        weatherType: 'weather', 
    });
    const { data: forecastWeather, error: forecastWeatherError, status: forecastWeatherStatus } = useWeather({
        ...currentLocation, 
        weatherType: 'forecast', 
    });

    if (currentWeatherStatus === 'loading' || forecastWeatherStatus === 'loading') {
        return (
            <PageLoader />
        )
    }

    if (currentWeatherStatus === 'error' || forecastWeatherStatus === 'error') {
        return (
            <PageError error={currentWeatherError || forecastWeatherError} />
        )
    }

    if (currentWeatherStatus === 'success' && forecastWeatherStatus === 'success') {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        let today = forecastWeather.list.filter((forecast) => new Date(forecast.dt * 1000) <= tomorrow);

        return (
            <>
                <h2 className={styles.name}>
                    {currentWeather.name}
                </h2>
                <span className={styles.day}>
                    {`${utils.getTheDayOfWeek(now, lang)}, `}
                </span>
                <span className={styles.hours}>
                    {utils.getTime(Date.now() / 1000, lang)}
                </span>
                <div className={styles.content}>
                    {/* NOW */}
                    <CurrentWeather 
                        className={styles.current}
                        data={currentWeather} 
                    />

                    {/* TODAY */}
                    {
                        today.length ? (
                            <DetailedForecast 
                                className={styles.today}
                                data={today}
                                title="Сегодня"
                            />
                        ) : (
                            null
                        )
                    }

                    {/* DAILY */}
                    <DailyForecast 
                        className={styles.daily}
                        data={forecastWeather} 
                    />

                    {/* SUN */}
                    <Sun 
                        className={styles.sun}
                        sunriseUnixTimestamp={currentWeather.sys.sunrise}
                        sunsetUnixTimeStamp={currentWeather.sys.sunset}
                    />
                </div>

            </>
        )
    }
}