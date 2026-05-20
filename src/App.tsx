import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />}    />
          <Route path="/roadmap"  element={<Roadmap />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
