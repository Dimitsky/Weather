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

    // После открытия меню, его можно закрыть клавишей Escape
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

    // Блокирует прокрутку страницы. 
    // С блокировкой страницы есть баг. Если в мобильно версии открыть меню, а затем увеличить окно браузера до настольной версии, 
    // то страница останется заблокированной. Я пока не придумал, как это грамотно решить 
    // (не хочется регистрировать обработчик, который все время будет отслеживать ширину страницы)

    // useEffect(() => {
    //     if (!isOpen) return;
        
    //     window.document.body.style.overflow = 'hidden';

    //     return () => {
    //         window.document.body.style.overflow = '';
    //     }
    // }, [isOpen])

    return (
        <nav
            className={className ? [styles.nav, className].join(' ') : styles.nav}
            role="navigation"
            aria-label="Главное меню"
            {...restProps}
        >
            <button
                className={styles.burger}
                aria-expanded={isOpen}
                aria-controls='menu'
                ref={triggerRef}
                onClick={handleToggleMenu}
            >
                <span className={styles.first}></span>
                <span className={styles.last}></span>
            </button>
            <FocusTrap disableForDesktop={true}>
                <ul
                    className={isOpen ? [styles.menu, styles.menuIsOpen].join(' ') : styles.menu}
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
            </FocusTrap>
        </nav>
    )
}