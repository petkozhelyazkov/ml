import FormInput from "./FormInput"
import AuthForm from "./AuthForm"
import { signIn } from "../../apis/firebase/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AlertContext } from "../../contexts/AlertContext";

export default function Login() {
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext)

    function onSubmit(e) {
        e.preventDefault(e)
        let { email, password } = Object.fromEntries(new FormData(e.target));
        signIn(email, password)
            .then(x => {
                showAlert('You logged in successfully!', 'success')
                navigate('/')
            })
            .catch(x => {
                showAlert(x.message, 'error')
            })
    }

    return (
        <AuthForm onSubmit={onSubmit} type='login'>
            <FormInput label='E-mail' name='email' type='text' />
            <FormInput label='Password' name='password' type='password' />
        </AuthForm>
    )
}