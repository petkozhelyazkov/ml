import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"
import MovieDetails from "./components/movie/MovieDetails"
import { AuthProvider } from "./contexts/AuthContext"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import Search from "./components/Search/Search"
import { ModalProvider } from "./contexts/ModalContext"
import { SearchProvider } from "./contexts/SearchContext"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <ModalProvider>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
              </Routes>
            </ModalProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
