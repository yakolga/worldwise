import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import City from "./components/City"
import Form from "./components/Form"
import CountriesList from "./components/CountriesList"

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path="pricing" element={<Pricing/>}/>
          <Route path="app" element={<AppLayout/>}>
            <Route index element={<Navigate replace to="cities"/>}></Route>
            <Route path="cities" element={<CityList/>}></Route>
            <Route path="cities/:id" element={<City/>}></Route>
            <Route path="countries" element={<CountriesList/>}></Route>
            <Route path="form" element={<Form/>}></Route>
          </Route>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
