import { useEffect, useRef } from "react"

const focusable = [
    'a[href]:not([disabled])', 
    'button:not([disabled])', 
    'textarea:not([disabled])', 
    'input[type="text"]:not([disabled])', 
    'input[type="radio"]:not([disabled])', 
    'input[type="checkbox"]:not([disabled])', 
    'select:not([disabled])', 
]

export default function FocusTrap({ children }) {
    const wrapRef = useRef(null);

    useEffect(() => {
        const element = wrapRef.current;
        const focusableEls = element.querySelectorAll(focusable.join(', '));
        const firstFocusable = focusableEls[0];
        const lastFocusable = focusableEls[focusableEls.length - 1];

        const handler = (e) => {
            if (e.code === 'Tab') {
                if (e.shiftKey) {
                    if (window.document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (window.document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }

        firstFocusable.focus();
        element.addEventListener('keydown', handler);

        return () => {
            element.removeEventListener('keydown', handler);
        }
    })
    return (
        <div ref={wrapRef}>
            {children}
        </div>
    )
}