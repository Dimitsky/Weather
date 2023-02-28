import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANG, UNITS } from '../../js/consts';
import { setLang } from '../../redux/langSlice/langSlice';
import { IconKebab, IconTranslate } from '../../components/Icon/Icon';
import { setUnits } from '../../redux/unitsSlice/unitsSlice';
import FocusTrap from '../FocusTrap/FocusTrap';

import styles from './Kebab.module.css';

export default function Kebab({ className }) {
    const lang = useSelector((state) => state.lang);
    const units = useSelector((state) => state.units);
    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState(false);
    const kebabTriggerRef = useRef(null);

    const handleChoosLang = (e) => {
        dispatch(setLang(e.target.dataset.lang));
    }

    const handleChoosUnits = (e) => {
        dispatch(setUnits(e.target.dataset.units));
    }

    const handleTrigger = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (!isOpen) return

        const kebabEl = kebabTriggerRef.current;

        const handler = (e) => {
            if (e.code === 'Escape') {
                setIsOpen(false);
            }
        }

        window.document.documentElement.addEventListener('keydown', handler);

        return () => {
            window.document.documentElement.removeEventListener('keydown', handler);
            kebabEl.focus();
        }

    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return

        const handler = (e) => {
            if (!e.target.closest('[data-kebab]')) {
                setIsOpen(false);
            }
        }

        window.document.documentElement.addEventListener('click', handler);

        return () => {
            window.document.documentElement.removeEventListener('click', handler);
        }
    }, [isOpen])

    return (
        <div 
            className={styles.wrap}
            data-kebab
        >
            <button 
                className={styles.trigger}
                aria-label="Открыть меню настроек"
                aria-expanded={isOpen}
                aria-controls="kebab-menu"
                ref={kebabTriggerRef}
                onClick={handleTrigger}
            >
                <IconKebab className={styles.icon}/>
            </button>
            {
                isOpen && (
                    <FocusTrap>
                        <ul 
                            className={className ? [styles.list, styles.className].join(' ') : styles.list}
                            id="kebab-menu"
                        >
                            <li className={styles.item}>
                                <button 
                                    className={lang === LANG.RU ? [styles.btn, styles.btnActive].join(' ') : styles.btn}
                                    data-lang={LANG.RU}
                                    onClick={handleChoosLang}
                                >
                                    Русский
                                    <IconTranslate className={styles.iconLang}/>
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button 
                                    className={lang === LANG.UA ? [styles.btn, styles.btnActive].join(' ') : styles.btn}
                                    data-lang={LANG.UA}
                                    onClick={handleChoosLang}
                                >
                                    Украинский
                                    <IconTranslate className={styles.iconLang}/>
                                </button>
                            </li>
                            <li className={[styles.item, styles.br].join(' ')}>
                                <button 
                                    className={lang === LANG.EN ? [styles.btn, styles.btnActive].join(' ') : styles.btn}
                                    data-lang={LANG.EN}
                                    onClick={handleChoosLang}
                                >
                                    Английский
                                    <IconTranslate className={styles.iconLang}/>
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button 
                                    className={units === UNITS.METRIC ? [styles.btn, styles.btnActive].join(' ') : styles.btn}
                                    data-units={UNITS.METRIC}
                                    onClick={handleChoosUnits}
                                >
                                    Цельсия
                                    <span className={styles.degree}>&deg;C</span>
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button 
                                    className={units === UNITS.IMPERIAL ? [styles.btn, styles.btnActive].join(' ') : styles.btn}
                                    data-units={UNITS.IMPERIAL}
                                    onClick={handleChoosUnits}
                                >
                                    Фаренгейта
                                    <span className={styles.degree}>&deg;F</span>
                                </button>
                            </li>
                        </ul>
                    </FocusTrap>
                )
            }
        </div>
    )
}