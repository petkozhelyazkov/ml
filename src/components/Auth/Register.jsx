import { TERipple } from "tw-elements-react";
import { Link, redirect } from 'react-router-dom'
import './Register.css'
import FormInput from "./FormInput";
import { signUp } from "../../apis/firebase/authService";

export default function Register() {

    function onSubmit(e) {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.target));
        signUp(email, password)
            .then(redirect('/'))
            .catch()//TODO
    }


    return (
        <div className="flex items-center justify-center bg-neutral-700">
            <section className="h-screen flex justify-center w-3/4 items-center bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-10">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img className="mx-auto w-40" src="https://img.icons8.com/nolan/96/movie.png" alt="movie" />
                                            </div>
                                            <form onSubmit={onSubmit}>
                                                <p className="mb-4">Please register an account</p>
                                                <FormInput label='E-mail' name='email' />
                                                <FormInput label='Password' name='password' />
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <TERipple rippleColor="light" className="w-full">
                                                        <button
                                                            className="gradientColor inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        >
                                                            Sign up
                                                        </button>
                                                    </TERipple>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Have an account?</p>
                                                    <TERipple rippleColor="light">
                                                        <button
                                                            className="
                                                                inline-block rounded border-2
                                                                px-6 pb-[6px]
                                                                pt-2 text-xs font-medium uppercase
                                                                leading-normal 
                                                                transition duration-150 ease-in-out
                                                                hover:bg-neutral-500
                                                                hover:bg-opacity-10  dark:hover:bg-neutral-100 
                                                                dark:hover:bg-opacity-10"
                                                            style={{
                                                                borderColor: 'rgba(9, 30, 121, 1)',
                                                                color: 'rgba(0, 14, 255, 1)'
                                                            }}
                                                        >
                                                            <Link to={'/login'}>

                                                                Login
                                                            </Link>
                                                        </button>
                                                    </TERipple>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="gradientColor flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    >
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                Take your first step into a larger world…
                                            </h4>
                                            <p className="text-sm">
                                                Sign in or register to get started. We’re your home for logging,
                                                rating and reviewing films, your watchlist of titles to see, your
                                                source for lists and inspiration, a cast and crew database and an
                                                activity stream of passionate film criticism, discussion and discovery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}