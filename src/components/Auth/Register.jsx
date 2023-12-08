import { useNavigate } from 'react-router-dom'
import { signUp } from "../../apis/firebase/authService";
import { lazy, useContext } from "react";
import { AlertContext, alertType } from "../../contexts/AlertContext";

const FormInput = lazy(() => import('./FormInput'))
const AuthForm = lazy(() => import('./AuthForm'))

export default function Register() {
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext)

    function onSubmit(e) {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.target));
        signUp(email, password)
            .then(x => {
                showAlert('You registered successfully!', alertType.success)
                navigate('/')
            })
            .catch(x => {
                showAlert(x.message, alertType.error)
            })
    }


    return (
        <AuthForm type='register' onSubmit={onSubmit}>
            <FormInput label='E-mail' name='email' type='text' />
            <FormInput label='Password' name='password' type='password' />
        </AuthForm>
    )
}