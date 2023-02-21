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
    const handleCancel = (e) => {
        setSearchResult(null);
        setInputValue('');
        e.preventDefault();
    }

    useEffect(() => {
        if (!debounceValue) return

        const api = new ApiSuggestions(DADATA_SUGGESTIONS_TOKEN, DADATA_SUGGESTIONS_BASE_URL);
        
        api.get(debounceValue)
            .then((result) => {
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
            <div className={styles.inputWrap}>
                <input
                    className={styles.input}
                    ref={ref}
                    type="text" 
                    name="search"
                    value={inputValue}
                    placeholder="Поиск города"
                    onChange={handleChange}
                />
                {
                    searchResult && (
                        <a 
                            className={styles.cancel}
                            href="#"
                            onClick={handleCancel}
                        >
                            Отмена
                        </a>
                    )
                }
            </div>
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
                                            className={styles.link}
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