import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import { SearchProvider } from "./contexts/SearchContext"
import { AlertProvider } from "./contexts/AlertContext"
import { useAuth } from "./hooks/useAuth"
import { movieGenres, tvGenres } from "./utils/genres"
import Spinner from "./components/Spinner"
import AuthGuard from "./components/Auth/AuthGuard"

const Navigation = lazy(() => import('./components/nav/Navigation'))
const Home = lazy(() => import('./components/home/Home'))
const MovieDetails = lazy(() => import('./components/movie/MovieDetails'))
const Alert = lazy(() => import('./components/alert/Alert'))
const Profile = lazy(() => import('./components/Profile/Profile'))
const Register = lazy(() => import('./components/Auth/Register'))
const Login = lazy(() => import('./components/Auth/Login'))
const Logout = lazy(() => import('./components/Auth/Logout'))
const ErrorPage = lazy(() => import('./components/ErrorPage'))

export default function App() {
    const user = useAuth()

    return (
        <>
            <BrowserRouter>
                <AlertProvider>
                    <AuthProvider>
                        <SearchProvider>
                            <ModalProvider>
                                <Suspense fallback={<Spinner />}>
                                    <Navigation />
                                    <Alert />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/movies" element={<Home />}>
                                            <Route path="trending" exact element={<Home />} />
                                            <Route path="upcoming" element={<Home />} />
                                            <Route path="top-rated" element={<Home />} />
                                            <Route path="genre" element={<Home />} >
                                                {movieGenres.map(x => <Route path={x.genre} key={x.id} element={<Home />} />)}
                                            </Route>
                                        </Route>
                                        <Route path="/shows" element={<Home />}>
                                            <Route path="trending" element={<Home />} />
                                            <Route path="top-rated" element={<Home />} />
                                            <Route path="genre" element={<Home />} >
                                                {tvGenres.map(x => <Route path={x.genre} key={x.id} element={<Home />} />)}
                                            </Route>
                                        </Route>

                                        <Route path="/movie/:id" element={<MovieDetails />} />
                                        <Route path="/show/:id" element={<MovieDetails />} />

                                        <Route path="/profile" element={user ? <Profile /> : <AuthGuard path='profile' />} />
                                        <Route path="/profile/liked" element={user ? <Profile /> : <AuthGuard path='liked' />} />
                                        <Route path="/profile/favorite" element={user ? <Profile /> : <AuthGuard path='favorite' />} />

                                        <Route path="/register" element={!user ? <Register /> : <AuthGuard isAuth />} />
                                        <Route path="/login" element={!user ? <Login /> : <AuthGuard isAuth />} />
                                        <Route path="/logout" element={<Logout />} />

                                        <Route path="*" element={<ErrorPage />} />
                                    </Routes>
                                </Suspense>
                            </ModalProvider>
                        </SearchProvider>
                    </AuthProvider>
                </AlertProvider>
            </BrowserRouter>
        </>
    )
}
