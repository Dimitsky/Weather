import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export default function CurrentLocationRequire({ children }) {
    const currentLocation = useSelector((state) => state.currentLocation);

    return (
        <>
            {
                currentLocation.lat && currentLocation.lon ? (
                    <>
                        {children}
                    </>
                ) : (
                    <Navigate to="/favorites" />
                )
            }
        </>
    )
}