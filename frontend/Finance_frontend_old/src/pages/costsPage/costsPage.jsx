import { useEffect } from "react"
import InputForm from "../../modules/inputForm/inputForm"
import { numberFormatRub } from "../../modules/calculator/functions/numberFormatHalper"
import { month, months, URLS } from "../../urls/urlsAndDates"

function CostsPage({
  categories,
  storageCategories,
  getCategories,
  getStorageCategories,
  getOperationList,
  getBalanceData,
  getInputData,
  inputData,
  changeRangeCalendar,
  setCheckMainField,
  setCheckCalculator,
}) {
  useEffect(() => {
    getInputData(URLS.sumOutcomeCash)
    setCheckMainField(true)
    setCheckCalculator(false)
    getOperationList(URLS.last5OutcomeCash, "-")
    getCategories(URLS.getOutcomeCategories)
    getStorageCategories(URLS.getMoneyBoxCategories)
    changeRangeCalendar(false)
  }, [])

  return (
    <div className="main_field">
      <h2 className="main_field_title">Расходы</h2>
      <div className="main_field_input">
        <input
          className="input_rub"
          value={numberFormatRub.format(inputData)}
          readOnly
        ></input>
      </div>
      <div className="main_field_title_label">
        Общий расход за <span className="balance_month">{months[month]}</span>
      </div>
      <InputForm
        title="Постоянные"
        type="constant"
        income_outcome="outcome"
        endpoint={URLS.last5OutcomeCash}
        typeOfSum={URLS.POSToutcomecash}
        getInputData={getInputData}
        sumCash={URLS.sumOutcomeCash}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getOutcomeCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
        addActive={true}
        storageType={false}
      />
      <InputForm
        title="Временные"
        type="once"
        income_outcome="outcome"
        endpoint={URLS.last5OutcomeCash}
        typeOfSum={URLS.POSToutcomecash}
        getInputData={getInputData}
        sumCash={URLS.sumOutcomeCash}
        typeForSum="once_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getOutcomeCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
        addActive={true}
        storageType={false}
      />
      <InputForm
        title="Накопления"
        type="accumulate"
        income_outcome="money_box"
        typeOfSum={URLS.POSTmoneyBox}
        getInputData={getInputData}
        sumCash={URLS.sumOutcomeCash}
        endpoint={URLS.last5MoneyBoxOperation}
        symbol=" "
        getOperationList={getOperationList}
        categories={storageCategories}
        getCategories={getStorageCategories}
        typeOfCategories={URLS.getMoneyBoxCategories}
        getBalanceData={getBalanceData}
        addActive={false}
      />

      <div className="mobileSum">
        <div className="mobileSum_input">
          <div className="mainTextSumm">
            Ваш общий расход за{" "}
            <span className="balance_month_mobile">{months[month]}</span>
          </div>
          <input
            className="input_rubMobile"
            value={numberFormatRub.format(inputData)}
            readOnly
          ></input>
        </div>
      </div>
    </div>
  )
}

export default CostsPage
