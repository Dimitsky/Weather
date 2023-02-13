import { Outlet } from "react-router-dom";
import styles from '../../Styles/Container.module.css';

export default function Root() {
    return (
        <div className={styles.container}>
            <Outlet />
        </div>
    )
}