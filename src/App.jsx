import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountriesList from "./components/CountriesList"

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function() {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err){
        alert('There was an error while loading a data')
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="app" element={<AppLayout/>}>
        <Route index element={<p>List of cities</p>}></Route>
        <Route path="cities" element={<CityList cities={cities} loading={loading}/>}></Route>
        <Route path="countries" element={<CountriesList cities={cities} loading={loading}/>}></Route>
        <Route path="form" element={<p>Form</p>}></Route>
      </Route>
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
