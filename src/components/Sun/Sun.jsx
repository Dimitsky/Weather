import { useSelector } from 'react-redux';
import utils from '../../js/utils';

import styles from './Sun.module.css';

export default function Sun({ className, sunriseUnixTimestamp, sunsetUnixTimeStamp, ...restProps }) {
    const lang = useSelector((state) => state.lang);

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
                    {utils.getTime(sunriseUnixTimestamp, lang)}
                </span>
                <h3 className={styles.subtitle}>
                    Заход
                </h3>
                <span className={styles.value}>
                    {utils.getTime(sunsetUnixTimeStamp, lang)}
                </span>
            </div>
        </div>
    )
}