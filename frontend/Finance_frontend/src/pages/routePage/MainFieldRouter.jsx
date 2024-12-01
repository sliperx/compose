import React from "react"
import { Route, Routes } from "react-router-dom"
import IncomePage from "../incomePage/incomePage"
import AnaliticPage from "../analiticPage/analiticPage"
import CostsPage from "../costsPage/costsPage"
import StoragePage from "../storagePage/storagePage"
import Calculator from "../../modules/calculator/Calculator"

const MainFieldRouter = ({
  categories,
  storageCategories,
  getCategories,
  getStorageCategories,
  storageSum,
  balanceToTarget,
  balanceToTargetInPercent,
  getOperationList,
  setSymbol,
  getBalanceData,
  getInputData,
  inputData,
  changeRangeCalendar,
  range,
  setCheckMainField,
  setCheckCalculator,
  gistogramSize,
}) => {
  return (
    <Routes>
      <Route
        path="/income"
        element={
          <IncomePage
            categories={categories}
            getCategories={getCategories}
            getOperationList={getOperationList}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            inputData={inputData}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            setCheckCalculator={setCheckCalculator}
          />
        }
      />
      <Route
        path="/costs"
        element={
          <CostsPage
            categories={categories}
            storageCategories={storageCategories}
            getCategories={getCategories}
            getStorageCategories={getStorageCategories}
            getOperationList={getOperationList}
            setSymbol={setSymbol}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            inputData={inputData}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            setCheckCalculator={setCheckCalculator}
          />
        }
      />
      <Route
        path="/storage"
        element={
          <StoragePage
            categories={categories}
            getCategories={getCategories}
            storageCategories={storageCategories}
            sum={storageSum}
            getStorageCategories={getStorageCategories}
            setCheckMainField={setCheckMainField}
            setCheckCalculator={setCheckCalculator}
            getOperationList={getOperationList}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
          />
        }
      />
      <Route
        path="/analitic"
        element={
          <AnaliticPage
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            getStorageCategories={getStorageCategories}
            sum={storageSum}
            balanceToTarget={balanceToTarget}
            balanceToTargetInPercent={balanceToTargetInPercent}
            setCheckMainField={setCheckMainField}
            setCheckCalculator={setCheckCalculator}
            gistogramSize={gistogramSize}
          />
        }
      />
      <Route
        path="/calculator"
        element={
          <Calculator
            setCheckMainField={setCheckMainField}
            setCheckCalculator={setCheckCalculator}
          />
        }
      ></Route>
    </Routes>
  )
}

export default MainFieldRouter
