import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

export default function NavBar({ className, ...restProps}) {
    const [ isOpen, setIsOpen ] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
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
                <span className={styles.first}></span>
                <span className={styles.last}></span>
            </button>
            {
                isOpen && (
                    <div className={styles.inner}>
                        <ul
                            className={styles.menu}
                            id="menu"
                        >
                            <li className={styles.item}>
                                <NavLink 
                                    className={({ isActive }) => isActive ? [styles.link, styles.activeLink].join(' ') : styles.link}
                                    to="/"
                                >
                                    Домой
                                </NavLink>
                            </li>
                            <li className={styles.item}>
                                <NavLink 
                                    className={({ isActive }) => isActive ? [styles.link, styles.activeLink].join(' ') : styles.link}
                                    to="/favorites"
                                >
                                    Избранное
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}