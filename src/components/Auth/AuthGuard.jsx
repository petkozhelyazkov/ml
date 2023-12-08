import { useContext, useEffect } from "react"
import { AlertContext, alertType } from "../../contexts/AlertContext"
import { useNavigate } from "react-router-dom"

export default function AuthGuard({
    isAuth,
    path
}) {
    const { showAlert } = useContext(AlertContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            showAlert('You are already logged in!', alertType.error)
            navigate('/movies/trending')
        } else if (!isAuth) {
            showAlert(`You have to be logged in to view ${path}!`, alertType.error)
            navigate('/login')
        }
    }, [])

    return (<></>)
}