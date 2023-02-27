import { createPortal } from "react-dom";

import styles from './PageLoader.module.css';

export default function PageLoader() {
    const domNode = window.document.body;
    const component = (
        <div className={styles.wrap}></div>
    );
    return createPortal(component, domNode)
}