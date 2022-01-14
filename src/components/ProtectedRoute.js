import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const ProtectedRoute = ({children}) => {

    const auth = useAuth()

    return (
        auth.user ? children : <Navigate to={'/sign-in'} />
    )
}

export default ProtectedRoute