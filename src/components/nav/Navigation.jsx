import './Navigation.css'
import { useContext, useState } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import { AuthContext } from "../../contexts/AuthContext"
import { movieNav, showNav, userNav } from "../../utils/navPaths"

const NavigationItem = lazy(() => import('./NavigationItem'))
const Separator = lazy(() => import('./Separator'))
const NavigationUser = lazy(() => import('./NavigationUser'))


export default function Navigation() {
    const { user } = useContext(AuthContext)
    const { updateMediaType } = useContext(SearchContext);
    const [open, setOpen] = useState(false)

    function onClick(type) {
        updateMediaType(type)
    }

    return (
        <nav>
            <div className="space-x-6 z-20 fixed h-screen bg-gray-900">
                {open ?
                    <div onMouseLeave={() => setOpen(false)} className="open flex flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-gray-900" >
                        <NavigationItem to='/movies/trending'>
                            <img className="mx-auto w-16" src="/movies.png" />
                        </NavigationItem>
                        <Separator label='Movies'>
                            {movieNav.map((x, i) =>
                                <NavigationItem onClick={() => { onClick('movies') }} key={i} label={x.label} to={x.path}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <Separator label='TV shows'>
                            {showNav.map((x, i) =>
                                <NavigationItem onClick={() => { onClick('shows') }} key={i} label={x.label} to={x.path}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <Separator>
                            {userNav.map((x, i) =>
                                <NavigationItem key={i} label={x.label} to={x.path}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <NavigationUser to={user?.uid ? '/profile' : '/login'}>
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">{user?.uid ? 'Profile' : 'Login'}</span>
                        </NavigationUser>
                    </div >
                    :
                    <div onMouseOver={() => setOpen(true)} className="close flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
                        <NavigationItem>
                            <img className="mx-auto w-16" src="/movies.png" alt="movie" />
                        </NavigationItem>
                        <Separator label='Movies'>
                            {movieNav.map((x, i) =>
                                <NavigationItem key={i}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <Separator label='Shows'>
                            {showNav.map((x, i) =>
                                <NavigationItem key={i}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <Separator>
                            {userNav.map((x, i) =>
                                <NavigationItem key={i}>
                                    <img className="svg w-6 h-6 stroke-current" src={x.img} />
                                </NavigationItem>
                            )}
                        </Separator>
                        <NavigationUser>
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </NavigationUser>
                    </div>
                }
            </div >
        </nav>
    )
}