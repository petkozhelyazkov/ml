import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"
import MovieDetails from "./components/movie/MovieDetails"
import { AuthProvider } from "./contexts/AuthContext"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import { ModalProvider } from "./contexts/ModalContext"
import { SearchProvider } from "./contexts/SearchContext"
import { AlertProvider } from "./contexts/AlertContext"
import Alert from "./components/Alert/Alert"
import Logout from "./components/Auth/Logout"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <SearchProvider>
              <ModalProvider>
                <Navigation />
                <Alert />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Home />}>
                    <Route path="trending" element={<Home />} />
                    <Route path="upcoming" element={<Home />} />
                    <Route path="top-rated" element={<Home />} />
                  </Route>
                  <Route path="/shows" element={<Home />}>
                    <Route path="trending" element={<Home />} />
                    <Route path="top-rated" element={<Home />} />
                  </Route>

                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/show/:id" element={<MovieDetails />} />

                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />

                </Routes>
              </ModalProvider>
            </SearchProvider>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </>
  )
}
