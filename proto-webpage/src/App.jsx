import './App.css'
import { Routes, Route } from "react-router"
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'
import NotFoundPage from './assets/pages/NotFoundPage'
import ShopPage from './assets/pages/ShopPage'
import ProductsPage from './assets/pages/ProductsPage'
import { Api_Context_Prod } from './assets/context/Prod_Context'

function App() {

  return (
    <>
    <Api_Context_Prod>
      <Routes>
      {/* Route Principali */}
        <Route path="*" element={<NotFoundPage />}/>
        <Route index element={<HomePage />}/>

      {/* Route Generali*/}
        <Route path='/shop' element={<ShopPage />}/>
        <Route path='/article/:name/:id' element={<ProductsPage />}/>
      </Routes>
    </Api_Context_Prod>
 
    </>
  )
}

export default App
