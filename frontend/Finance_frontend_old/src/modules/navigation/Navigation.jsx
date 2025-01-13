import "./Navigation.css"
import Logo from "../../Components/logo/Logo"
import ButtonNaviBlock from "./buttonNaviBlock/ButtonNaviBlock"
import exitUser from "../../assets/Images/exit.png"
import { useNavigate } from "react-router"

import { useDispatch } from "react-redux"
import { removeUser } from "../../store/slice"

function Navigation({ menuActive, setMenuActive }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exitClick = () => {
    dispatch(removeUser())
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <div className={menuActive ? "navigation active" : "navigation"}>
      <Logo />
      <ButtonNaviBlock />
      <div className="exit" onClick={() => exitClick()}>
        <div className="textExit">Выход</div>
        <img src={exitUser} alt="exit" />
      </div>
    </div>
  )
}

export default Navigation
