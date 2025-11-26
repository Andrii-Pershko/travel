import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchInput from './components/SearchInput/SearchInput.jsx'
import TourDetails from './page/TourDetails.jsx'

const basename = import.meta.env.BASE_URL || '/'

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/tour" element={<TourDetails />} />
      </Routes>
    </BrowserRouter>
  )
}