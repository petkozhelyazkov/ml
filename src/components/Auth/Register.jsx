import { useNavigate } from 'react-router-dom'
import FormInput from "./FormInput";
import { signUp } from "../../apis/firebase/authService";
import AuthForm from "./AuthForm";

export default function Register() {
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.target));
        signUp(email, password)
            .then(navigate('/'))
            .catch()//TODO
    }


    return (
        <AuthForm type='register' onSubmit={onSubmit}>
            <FormInput label='E-mail' name='email' type='text' />
            <FormInput label='Password' name='password' type='password' />
        </AuthForm>
    )
}