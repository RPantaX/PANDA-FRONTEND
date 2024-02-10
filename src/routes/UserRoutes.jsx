import { Route, Routes } from "react-router-dom"
import { AllMenu } from "../menu/AllMenu"
import Navbar from "../components/layout/Navbar"
import { Home } from "../menu/home"
import { TrabajadoresPages } from "../pages/TrabajadoresPages"
import { RegisterPages } from "../pages/RegisterPages"
import { UserProvider } from "../context/UserProvider"

export const UserRoutes = () => {
  return (
    <>
    <UserProvider>
        <Navbar/>
        <AllMenu/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trabajadores" element={<TrabajadoresPages/>} />
            <Route path="/trabajadores/register" element={<RegisterPages/>} />
              <Route path="/trabajadores/edit/:id" element={<RegisterPages/>} />
              {/*<Route path="*" element={<Navigate to="/" />} />*/}
          </Routes>
      </UserProvider>
      </>
    )
  }
  
            