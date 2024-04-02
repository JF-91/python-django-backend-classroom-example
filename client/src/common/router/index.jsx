import NavBarApp from "../navbar"
import { Outlet } from "react-router-dom"
import FooterApp from "../footer"

const RouterLayout = () => {
  return (
    <>
      <NavBarApp />
      <Outlet />
      <FooterApp />
    </>
  )
}

export default RouterLayout