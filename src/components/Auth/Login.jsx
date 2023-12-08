import { signIn } from "../../apis/firebase/authService";
import { useNavigate } from "react-router-dom";
import { lazy, useContext } from "react";
import { AlertContext, alertType } from "../../contexts/AlertContext";

const FormInput = lazy(() => import('./FormInput'))
const AuthForm = lazy(() => import('./AuthForm'))

export default function Login() {
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext)

    function onSubmit(e) {
        e.preventDefault(e)
        let { email, password } = Object.fromEntries(new FormData(e.target));
        signIn(email, password)
            .then(x => {
                showAlert('You logged in successfully!', alertType.success)
                navigate('/')
            })
            .catch(x => {
                showAlert(x.message, alertType.error)
            })
    }

    return (
        <AuthForm onSubmit={onSubmit} type='login'>
            <FormInput label='E-mail' name='email' type='text' />
            <FormInput label='Password' name='password' type='password' />
        </AuthForm>
    )
}