import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './Sun.module.css';

export default function Sun({ className, data, ...restProps }) {
    const lang = useSelector((state) => state.lang);
    const sunriseUnixTimestamp = data.sys.sunrise;
    const sunsetUnixTimeStamp = data.sys.sunset;

    return (
        <div
            className={className ? [styles.wrap, className].join(' ') : styles.wrap}
            {...restProps}
        >
            <h2 className={styles.title}>
                Солнце
            </h2>
            <div className={styles.inner}>
                <h3 className={styles.subtitle}>
                    Восход
                </h3>
                <span className={styles.value}>
                    {`${utils.getHours(sunriseUnixTimestamp, lang)}:${utils.getMinutes(sunriseUnixTimestamp)}`}
                </span>
                <h3 className={styles.subtitle}>
                    Заход
                </h3>
                <span className={styles.value}>
                    {`${utils.getHours(sunsetUnixTimeStamp, lang)}:${utils.getMinutes(sunsetUnixTimeStamp)}`}
                </span>
            </div>
        </div>
    )
}