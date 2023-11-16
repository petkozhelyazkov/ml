import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"
import MovieDetails from "./components/movie/MovieDetails"
import { MovieProvider } from "./contexts/MovieContext"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MovieProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </MovieProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
