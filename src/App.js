import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import Product from './Pages/Product/Product';
import AboutUs from './Pages/AboutUs/AboutUs';

const App = () => {

    return (
        <BrowserRouter>
          <Navbar/>
          <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/products' element={<Products/>}/>
             <Route path='/product/:id' element={<Product/>}/>
             <Route path='/about' element={<AboutUs/>}/>
          </Routes>
        </BrowserRouter>
    )
}

export default App;
