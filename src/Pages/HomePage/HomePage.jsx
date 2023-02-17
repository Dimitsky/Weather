import { useSelector } from 'react-redux';
import TheDayForecast from '../../components/TheDayForecast/TheDayForecast';
import NowForecast from '../../components/NowForecast/NowForecast';
import PageError from '../../components/PageError/PageError';
import PageLoader from '../../components/PageLoader/PageLoader';
import useWeather from '../../hooks/useWeather';
import utils from '../../js/utils';
import WeekForecast from '../../components/WeekForecast/WeekForecast';
import Sun from '../../components/Sun/Sun';

export default function HomePage() {
    const lang = useSelector((state) => state.lang);
    const currentLocation = useSelector(state => state.currentLocation);
    
    const { data: nowWeather, error: nowWeatherError, status: nowWeatherStatus } = useWeather({
        ...currentLocation, 
        weatherType: 'weather', 
    });
    const { data: forecastWeather, error: forecastWeatherError, status: forecastWeatherStatus } = useWeather({
        ...currentLocation, 
        weatherType: 'forecast', 
    });

    if (nowWeatherStatus === 'loading' || forecastWeatherStatus === 'loading') {
        return (
            <PageLoader />
        )
    }

    if (nowWeatherStatus === 'error' || forecastWeatherStatus === 'error') {
        return (
            <PageError error={nowWeatherError || forecastWeatherError} />
        )
    }

    if (nowWeatherStatus === 'success' && forecastWeatherStatus === 'success') {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const theDayOfWeek = utils.getTheDayOfWeek(now, lang);
        const hours12 = utils.getHours(now / 1000, lang);

        const todayForecast = forecastWeather.list.filter((forecast) => new Date(forecast.dt * 1000) <= tomorrow);

        return (
            <>
                <p>
                    {nowWeather.name}
                </p>
                <p>
                    {theDayOfWeek}
                </p>
                <p>
                    {hours12}
                </p>

                {/* NOW */}
                <NowForecast data={nowWeather} />

                {/* TODAY */}
                <TheDayForecast 
                    data={todayForecast} 
                    title="Сегодня"
                />

                {/* WEEK */}
                <WeekForecast data={forecastWeather} />

                {/* SUN */}
                <Sun data={nowWeather} />
            </>
        )
    }
}