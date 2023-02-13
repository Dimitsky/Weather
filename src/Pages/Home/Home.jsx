import useSuggestions from '../../hooks/useSuggestions';

export default function() {
    const { data: suggestionsData, error: suggestionsError, status: suggestionsStatus } = useSuggestions('балаково');

    if (suggestionsStatus === 'success') console.log(suggestionsData)
    return (
        <h1>Home</h1>
    )
}