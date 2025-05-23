import './App.css'
import { Routes, Route } from "react-router"
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'
import NotFoundPage from './assets/pages/NotFoundPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="*" element={<NotFoundPage />}/>
      <Route index element={<HomePage />}/>
      <Route path='/contact' element={<ProfilePage />} />
    </Routes>
    </>
  )
}

export default App
