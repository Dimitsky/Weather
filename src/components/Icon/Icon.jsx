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

function IconTranslate({ className }) {
    return (
        <svg 
            className={className ? [styles.icon, styles.iconTranslate, className].join(' ') : [styles.icon, styles.iconTranslate].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
            <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
        </svg>
    )
}

function IconCaretUp({ className }) {
	return (
        <svg 
            className={className ? [styles.icon, styles.iconCaretUp, className].join(' ') : [styles.icon, styles.iconCaretUp].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
	)
}

export {
    IconCancelFill, 
    IconGeoFill, 
    IconPencilFill, 
    IconPluslFill, 
    IconKebab, 
    IconTranslate, 
    IconCaretUp, 
}