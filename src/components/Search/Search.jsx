import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import ApiSuggestions from '../../js/ApiSuggestions';
import { DADATA_SUGGESTIONS_TOKEN } from '../../js/config';
import { DADATA_SUGGESTIONS_BASE_URL } from '../../js/consts';

import styles from './Search.module.css';

function SearchForwardRef({ className }, ref) {
    const [ searchResult, setSearchResult ] = useState(null);
    const [ inputValue, setInputValue ] = useState('');
    const debounceValue = useDebounce(inputValue, 1000);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    
    useEffect(() => {
        if (!debounceValue) return

        const api = new ApiSuggestions(DADATA_SUGGESTIONS_TOKEN, DADATA_SUGGESTIONS_BASE_URL);
        
        api.get(debounceValue)
            .then((result) => {
                console.log(result)
                setSearchResult(result.suggestions);
            })
            .catch((error) => {
                alert(error.message);
            })
    }, [debounceValue]);
    
    return (
        <div
            className={className ? [styles.wrapper, className].join(' ') : styles.wrapper}
        >
            <input
                className={styles.input}
                ref={ref}
                type="text" 
                name="search"
                value={inputValue}
                onChange={handleChange}
            />
            {
                searchResult && (
                    <ul className={styles.list}>
                        {
                            searchResult.map((suggestion) => {
                                return (
                                    <li
                                        className={styles.item}
                                        key={suggestion.value}
                                    >
                                        <Link 
                                            className={styles.searchLink}
                                            to={`/location?lat=${suggestion.data.geo_lat}&lon=${suggestion.data.geo_lon}`}
                                            // onClick={() => handleOnClickSearchLink(suggestion)}
                                        >
                                            {suggestion.value}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default forwardRef(SearchForwardRef);