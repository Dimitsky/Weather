export default function PageError({ error }) {
    return (
        <h1>
            {error.message}
        </h1>
    )
}