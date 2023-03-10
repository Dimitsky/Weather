import { useQuery } from '@tanstack/react-query';

import ApiSuggestions from '../js/apiSuggestions';
import { DADATA_SUGGESTIONS_TOKEN } from '../js/config';
import { DADATA_SUGGESTIONS_URL } from '../js/consts';

export default function useSuggestions(query) {
    const handleSuggestions = () => {
        const api = new ApiSuggestions(DADATA_SUGGESTIONS_TOKEN, DADATA_SUGGESTIONS_URL);

        return api.get(query);
    }

    return useQuery({
        queryKey: ['suggestions', {query}], 
        queryFn: handleSuggestions, 
        onError: (error) => {
            alert(error.message);
        }, 
        cacheTime: 3.6e6, 
        refetchOnWindowFocus: false, 
    });
}