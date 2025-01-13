import { NavLink } from "react-router-dom"
import arrow from "../../../assets/Images/Arrow.png"
import AnaliticVector from "../../../assets/Images/AnaliticVector.png"
import CostsVector from "../../../assets/Images/CostsVector.png"
import FieldVector from "../../../assets/Images/FieldVector.png"
import StorVector from "../../../assets/Images/StorVector.png"
import CalcVector from "../../../assets/Images/CalcVector.png"


function ButtonNaviBlock() {
  return (
    <div className="button_navi_block">
      <NavLink to="/profile/income" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={FieldVector} alt="vectorImg" />
          Доходы
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/profile/costs" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={CostsVector} alt="vectorImg" />
          Расходы
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/profile/storage" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={StorVector} alt="vectorImg" />
          Накопления
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/profile/analitic" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={AnaliticVector} alt="vectorImg" />
          Аналитика
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/profile/calculator" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={CalcVector} alt="vectorImg" />
          Калькулятор
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
    </div>
  )
}

export default ButtonNaviBlock
