import { useEffect } from "react"
import { logOut } from "../../apis/firebase/authService"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        logOut().then(x => {
            navigate('/')
        })
    }, [])

    return (
        <div>

        </div>
    )
}