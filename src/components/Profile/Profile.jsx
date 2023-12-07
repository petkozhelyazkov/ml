import { useContext, useEffect } from "react";
import { TERipple } from "tw-elements-react";
import { AuthContext } from "../../contexts/AuthContext";
import * as userService from '../../apis/firebase/userService'
import Saved from "./Saved";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user, updateUser } = useContext(AuthContext)


    function onSubmit(e) {
        e.preventDefault();
        let { imgUrl, displayName } = Object.fromEntries(new FormData(e.target).entries());

        userService.updateProfile(user.uid, { imgUrl, displayName })
        updateUser({ imgUrl, displayName })
    }

    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className="w-2/3 bg-gray-900 flex flex-col items-center p-6 rounded-2xl mt-8 mb-10">
                <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    {user?.imgUrl
                        ? < img className="absolute w-32 h-32" src={user?.imgUrl} alt="" />
                        : <svg className="absolute w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    }
                </div>
                <div className="fixed inset-x-[76.4%]">
                    <Link to='/logout' className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                        Logout
                    </Link>
                </div>
                <div className="mt-5 w-1/3">
                    <form onSubmit={onSubmit} className="flex flex-col">
                        <div>
                            <div className="relative mb-5">
                                <input name="imgUrl"
                                    className="block py-2.5 px-0 w-full
                                text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-300 appearance-none dark:text-white
                                dark:border-gray-600 
                                focus:outline-none text-center"
                                    defaultValue={user?.imgUrl} placeholder="Profile photo URL" />
                            </div>
                            <div className="relative mb-5">
                                <input name="displayName"
                                    className="block py-2.5 px-0 w-full
                                text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-300 appearance-none dark:text-white
                                dark:border-gray-600 
                                focus:outline-none text-center"
                                    defaultValue={user?.displayName} placeholder="Display name" />
                            </div>
                            <div className="relative mb-5">
                                <input name="email"
                                    className="block py-2.5 px-0 w-full
                                text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-300 appearance-none dark:text-white
                                dark:border-gray-600 
                                focus:outline-none text-center" disabled placeholder={'Email: ' + user?.email} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <TERipple>
                                <button type="submit" className="text-white w-1/3 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Save</button>
                            </TERipple>
                        </div>
                    </form>
                </div>
            </div>
            <Saved />
        </div>
    )
}