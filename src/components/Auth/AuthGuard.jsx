import { useContext, useEffect } from "react"
import { AlertContext, alertType } from "../../contexts/AlertContext"
import { useNavigate } from "react-router-dom"

export default function AuthGuard() {
    const { showAlert } = useContext(AlertContext)
    const navigate = useNavigate()

    useEffect(() => {
        showAlert('You are already logged in!', alertType.error)
        navigate('/movies/trending')
    }, [])

    return (<></>)
}