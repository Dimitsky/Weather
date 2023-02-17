import Search from "../../components/Search/Search";
import LocationMini from '../../components/LocationMini/LocationMini';

import styles from './FavoritesPage.module.css';
import useFavorites from "../../hooks/useFavorites";
import PageLoader from "../../components/PageLoader/PageLoader";
import PageError from "../../components/PageError/PageError";

export default function FavoritesPage() {
    const { data, error, status } = useFavorites();

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
            <>
                <Search />
                {
                    data.length ? (
                        <ul className={styles.list}>
                            {
                                data.map((fav) => (
                                    <li
                                        key={fav.coord.lat + fav.coord.lon}
                                    >
                                        <LocationMini data={fav} />
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        null
                    )
                }
            </>
        )
    }
}