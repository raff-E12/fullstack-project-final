import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from './layout/DefaultLayout';
import "./App.css"
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import CheckOutPage from './pages/CheckOutPage';
import Homepage from './pages/Homepage';
import ProductsPage from './pages/ProductsPage';
import SingleCategoryPage from './pages/SingleCategoryPage';
import SingleCategoryProductPage from './pages/SingleCategoryProductPage';
import SingleOrderPage from './pages/SingleCategoryPage'
import SingleProductPage from './pages/SingleProductPage';

export default function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>

          <Route path='/' element={<Homepage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:slug' element={<SingleProductPage />} />
          <Route path='/products/category/:categorySlug' element={<SingleCategoryProductPage />} />

          <Route path='/orders/:slug' element={<SingleOrderPage />} />

          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/:categorySlug' element={<SingleCategoryPage />} />

          <Route path='/checkout' element={<CheckOutPage />} />
          <Route path='/cart' element={<CartPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}
