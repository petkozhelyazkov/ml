import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/nav/Navigation"
import Home from "./components/home/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
