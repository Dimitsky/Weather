import { useQuery } from '@tanstack/react-query';

import ApiSuggestions from '../js/apiSuggestions';
import { TOKEN } from '../js/config';
import { URL } from '../js/consts';

export default function useSuggestions(query) {
    const handleSuggestions = () => {
        const apiSuggestions = new ApiSuggestions(TOKEN, URL);

        return apiSuggestions.get(query);
    }

    return useQuery({
        queryKey: ['suggestions', {query}], 
        queryFn: handleSuggestions, 
        cacheTime: 3.6e6, 
        refetchOnWindowFocus: false, 
    });
}