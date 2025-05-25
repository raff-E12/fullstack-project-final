import './App.css'
import { Routes, Route } from "react-router"
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'
import NotFoundPage from './assets/pages/NotFoundPage'
import ShopPage from './assets/pages/ShopPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="*" element={<NotFoundPage />}/>
      <Route index element={<HomePage />}/>
      <Route path='/shop' element={<ShopPage />}/>
    </Routes>
    </>
  )
}

export default App
