
import { AllMenu } from "../menu/AllMenu"
import Navbar from "../components/layout/Navbar"

import { UserProvider } from "../context/UserProvider"

export const UserRoutes = () => {
  return (
    <>
    <UserProvider>
        <Navbar/>
        <AllMenu/>
    </UserProvider>
      </>
    )
  }
  
            