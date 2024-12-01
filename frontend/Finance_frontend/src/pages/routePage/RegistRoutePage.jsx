import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Profile from "../../modules/profile/profile"
import RegistrationPage from "../registrationPage/registrationPage"
import AuthorizationPage from "../authorizationPage/authorizationPage"
import RecoveryPass from "../recoveryPage/RecoveryPage"
import NewPass from "../recoveryPage/NewPass"

const RegistRoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/regist" element={<RegistrationPage />} />
      <Route path="/profile/" element={<Navigate to="/profile/income" />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/recovery" element={<RecoveryPass />} />
      <Route path="/password/reset/confirm/" element={<NewPass />} />
    </Routes>
  )
}

export default RegistRoutePage
