import { createPortal } from "react-dom";

import styles from './PageLoader.module.css';
import loaderStyles from './loader.css';

export default function PageLoader() {
    const domNode = window.document.body;
    const component = (
        <div className={styles.wrap}>
            <div className={styles.inner}>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
    
    return createPortal(component, domNode)
}