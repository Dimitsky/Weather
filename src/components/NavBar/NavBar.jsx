import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseImperial, chooseMetric } from '../../redux/unitsSlice/unitsSlice';

import styles from './NavBar.module.css';

export default function NavBar({ className, ...restProps}) {
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const currentLocation = useSelector((state) => state.currentLocation);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleCelsius = (e) => {
        e.preventDefault();
        dispatch(chooseMetric());
        queryClient.invalidateQueries(['weather']);
        queryClient.invalidateQueries(['forecast']);
    }
    
    const handleFahrenheit = (e) => {
        e.preventDefault()
        dispatch(chooseImperial());
        queryClient.invalidateQueries(['weather']);
        queryClient.invalidateQueries(['forecast']);
    }

    return (
        <div
            className={className ? [styles.wrapper, className].join(' ') : styles.wrapper}
            {...restProps}
        >
            <button
                className={styles.burger}
                aria-expanded={isOpen}
                aria-controls='menu'
                onClick={handleToggleMenu}
            >
                <span className="first"></span>
                <span className="last"></span>
            </button>
            <ul
                className={styles.menu}
                id="menu"
            >
                <li className={styles.item}>
                    <a 
                        className={styles.link}
                        href="#"
                        onClick={handleCelsius}
                    >
                        Градусы Цельсия
                    </a>
                </li>
                <li className={styles.item}>
                    <a 
                        className={styles.link}
                        href="#"
                        onClick={handleFahrenheit}
                    >
                        Градусы Фаренгейта
                    </a>
                </li>
            </ul>
        </div>
    )
}