import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

import styles from './Root.module.css';

export default function Root() {
    return (
        <div className={styles.container}>
            <NavBar className={styles.burger} />
            <Outlet />
        </div>
    )
}