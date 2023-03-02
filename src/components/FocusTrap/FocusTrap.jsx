import { useEffect, useRef } from "react"

// Элементы, на которых можно сфокусироваться (не полный список)
const focusable = [
    'a[href]:not([disabled])', 
    'button:not([disabled])', 
    'textarea:not([disabled])', 
    'input[type="text"]:not([disabled])', 
    'input[type="radio"]:not([disabled])', 
    'input[type="checkbox"]:not([disabled])', 
    'select:not([disabled])', 
]

// disableForDesktop включает либо отключает ловушку фокуса для настольной версии макета. 
// Если ловушку фокуса не отключить (например, для бургер меню, которое всегда находится на экране в настольной версии), 
// то пользователь не сможет использовать навигацию с помощью клавиатуры, 
// т. к. фокус застрянет внутри меню, как только в него попадет. 
export default function FocusTrap({ children, isActive, disableForDesktop = false }) {
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;
        const element = wrapRef.current;
        // Фокусируемы элементы внутри компонента
        const focusableEls = element.querySelectorAll(focusable.join(', '));
        // Первый фокусируемый элемент
        const firstFocusable = focusableEls[0];
        // Последний фокусируемый элемент
        const lastFocusable = focusableEls[focusableEls.length - 1];

        const handler = (e) => {
            if (disableForDesktop) {
                const clientWidth = window.document.documentElement.clientWidth;
    
                if (clientWidth >= 992) return
            }

            if (e.code === 'Tab') {
                // если пользователь пытается сфокусироваться на предыдущем элементе
                if (e.shiftKey) {
                    // Если текущий фокус на первом элементе списка
                    if (window.document.activeElement === firstFocusable) {
                        // То сфокусироваться на последнем элементе списка
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                // иначе пользователь пытается сфокусироваться на следующем элементе
                } else {
                    // Если текущий фокус на последнем элементе списка
                    if (window.document.activeElement === lastFocusable) {
                        // То сфокусироваться на первом элементе списка
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }

        const clientWidth = window.document.documentElement.clientWidth;
        
        // Данная проверка необходима, чтобы отключить фокусировку на первом элементе для компонента с пропсом disableForDesktop 
        // (без этой проверки, после загрузки страницы фокус будет на первом элементе в списке главного меню)
        if (disableForDesktop) {

            if (clientWidth < 992) {
                // При открытии сфокусироваться на первом элементе
                firstFocusable.focus();
            }
        } else {
            // При открытии сфокусироваться на первом элементе
            firstFocusable.focus();
        }

        element.addEventListener('keydown', handler);

        return () => {
            element.removeEventListener('keydown', handler);
         }
    }, [isActive])

    return (
        <div ref={wrapRef}>
            {children}
        </div>
    )
}