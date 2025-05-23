import './App.css'
import { Routes, Route } from "react-router"
import HomaPage from './assets/pages/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomaPage />}/>
    </Routes>
    </>
  )
}

export default App
