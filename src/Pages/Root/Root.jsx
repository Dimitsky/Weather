import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

import styles from '../../Styles/Container.module.css';

export default function Root() {
    return (
        <div className={styles.container}>
            <header>
                <NavBar />
            </header>
            <Outlet />
        </div>
    )
}