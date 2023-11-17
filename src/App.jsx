import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"
import MovieDetails from "./components/movie/MovieDetails"
import { MovieProvider } from "./contexts/MovieContext"
import { AuthProvider } from "./contexts/AuthContext"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MovieProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </MovieProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
