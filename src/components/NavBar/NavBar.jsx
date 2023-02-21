import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FocusTrap from '../FocusTrap/FocusTrap';

import styles from './NavBar.module.css';

export default function NavBar({ className, ...restProps}) {
    const [ isOpen, setIsOpen ] = useState(false);
    const triggerRef = useRef(null);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const handleOnClickLink = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (!isOpen) return;

        const burgerEl = triggerRef.current;

        const handler = (e) => {
            if (e.code === 'Escape') {
                setIsOpen(false);
            }
        }

        window.document.documentElement.addEventListener('keydown', handler);

        return () => {
            window.document.documentElement.removeEventListener('keydown', handler);
            burgerEl.focus();
        }
    }, [isOpen]);

    return (
        <div
            className={className ? [styles.wrapper, className].join(' ') : styles.wrapper}
            {...restProps}
        >
            <button
                className={isOpen ? [styles.burger, styles.burgerActive].join(' ') : styles.burger}
                aria-expanded={isOpen}
                aria-controls='menu'
                ref={triggerRef}
                onClick={handleToggleMenu}
            >
                <span className={styles.first}></span>
                <span className={styles.last}></span>
            </button>
            {
                isOpen && (
                    <FocusTrap>
                        <div className={styles.inner}>
                            <ul
                                className={styles.menu}
                                id="menu"
                            >
                                <li className={styles.item}>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? [styles.link, styles.activeLink].join(' ') : styles.link}
                                        to="/"
                                        onClick={handleOnClickLink}
                                    >
                                        Домой
                                    </NavLink>
                                </li>
                                <li className={styles.item}>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? [styles.link, styles.activeLink].join(' ') : styles.link}
                                        to="/favorites"
                                        onClick={handleOnClickLink}
                                    >
                                        Избранное
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </FocusTrap>
                )
            }
        </div>
    )
}