import FormInput from "./FormInput"
import AuthForm from "./AuthForm"
import { signIn } from "../../apis/firebase/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault(e)
        let { email, password } = Object.fromEntries(new FormData(e.target));
        signIn(email, password)
            .then(navigate('/'))
            .catch()//TODO
    }

    return (
        <AuthForm onSubmit={onSubmit} type='login'>
            <FormInput label='E-mail' name='email' type='text' />
            <FormInput label='Password' name='password' type='password' />
        </AuthForm>
    )
}