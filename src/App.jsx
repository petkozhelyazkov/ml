import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"
import { MovieProvider } from "./contexts/MovieContext"

function App() {
  return (
    <>
      <BrowserRouter>
        <MovieProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </>
  )
}

export default App
