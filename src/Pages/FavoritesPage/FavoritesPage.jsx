import Search from "../../components/Search/Search";
import PreviewWeather from '../../components/PreviewWeather/PreviewWeather';
import useFavorites from "../../hooks/useFavorites";
import PageLoader from "../../components/PageLoader/PageLoader";
import PageError from "../../components/PageError/PageError";

import styles from './FavoritesPage.module.css';
import { useState } from "react";
import { IconPencilFill } from "../../components/Icon/Icon";

export default function FavoritesPage() {
    const { data, error, status } = useFavorites();
    const [ editMode, setEditMode ] = useState(false);

    const haandleToggleEditMode = () => {
        setEditMode(!editMode);
    }

    if (status === 'loading') {
        return (
            <PageLoader />
        )
    }

    if (status === 'error') {
        return (
            <PageError error={error} />
        )
    }

    if (status === 'success') {
        return (
            <div className={styles.wrap}>
                <Search className={styles.search}/>
                {
                    data.length ? (
                        <>
                            <button
                                className={styles.editBtn}
                                aria-label="Редактировать избранное"
                                onClick={haandleToggleEditMode}
                            >
                                <IconPencilFill className={editMode ? [styles.iconPencil, styles.iconPencilActive].join(' ') : styles.iconPencil}/>
                            </button>
                            <ul className={styles.list}>
                                {
                                    data.map((fav) => (
                                        <li
                                            key={fav.coord.lat + fav.coord.lon}
                                            className={styles.item}
                                        >
                                            <PreviewWeather 
                                                data={fav} 
                                                editMode={editMode}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    ) : (
                        null
                    )
                }
            </div>
        )
    }
}