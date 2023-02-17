import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './Sun.module.css';

export default function Sun({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    const sunriseUnixTimestamp = data.sys.sunrise;
    const sunsetUnixTimeStamp = data.sys.sunset;

    return (
        <div
            className={className ? [styles.wrapper, className].join(' ') : styles.wrapper}
            {...restProps}
        >
            <h2>
                Солнце
            </h2>
            <div>
                <h3>
                    Восход
                </h3>
                <span>
                    {`${utils.getHours(sunriseUnixTimestamp, lang)}:${utils.getMinutes(sunriseUnixTimestamp)}`}
                </span>
                <h3>
                    Заход
                </h3>
                <span>
                    {`${utils.getHours(sunsetUnixTimeStamp, lang)}:${utils.getMinutes(sunsetUnixTimeStamp)}`}
                </span>
            </div>
        </div>
    )
}