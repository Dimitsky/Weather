import { useEffect } from "react";
import { useState } from "react";

export default function useDebounce(value, ms = 300) {
    const [ debounceValue, setDebounceValue ] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, ms)

        return () => {
            clearTimeout(timeoutId);
        }
    }, [value, ms]);

    return debounceValue
}