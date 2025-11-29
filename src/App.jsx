import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import SpinnerFullPage from "./components/SpinnerFullPage"

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./components/CityList"
import City from "./components/City"
import Form from "./components/Form"
import CountriesList from "./components/CountriesList"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <HashRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
            <Routes>
              <Route index element={<HomePage/>}/>
              <Route path="product" element={<Product/>}/>
              <Route path="pricing" element={<Pricing/>}/>
              <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                <Route index element={<Navigate replace to="cities"/>}></Route>
                <Route path="cities" element={<CityList/>}></Route>
                <Route path="cities/:id" element={<City/>}></Route>
                <Route path="countries" element={<CountriesList/>}></Route>
                <Route path="form" element={<Form/>}></Route>
              </Route>
              <Route path="login" element={<Login/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </Suspense>
        </HashRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
