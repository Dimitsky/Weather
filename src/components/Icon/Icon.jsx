import styles from './Icon.module.css';

function IconCancelFill({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconCancelFill, className].join(' ') : [styles.icon, styles.iconCancelFill].join(' ')} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
    )
}

function IconGeoFill({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconGeoFill, className].join(' ') : [styles.icon, styles.iconGeoFill].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
    )
}

function IconPencilFill({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconPencilFill, className].join(' ') : [styles.icon, styles.iconPencilFill].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
    )
}

function IconPluslFill({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconPluslFill, className].join(' ') : [styles.icon, styles.iconPluslFill].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    )
}

function IconKebab({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconKebab, className].join(' ') : [styles.icon, styles.iconKebab].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
    )
}

export {
    IconCancelFill, 
    IconGeoFill, 
    IconPencilFill, 
    IconPluslFill, 
    IconKebab, 
}