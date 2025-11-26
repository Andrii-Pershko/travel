import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchInput from './components/SearchInput/SearchInput.jsx'
import TourDetails from './page/TourDetails.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/tour" element={<TourDetails />} />
      </Routes>
    </BrowserRouter>
  )
}