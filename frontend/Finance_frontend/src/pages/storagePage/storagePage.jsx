import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import InputForm from "../../modules/inputForm/inputForm"
import { URLS, dateOnline } from "../../urls/urlsAndDates"
import Modal from "../../modules/modalWindow/Modal"
import modalStyle from "../../modules/modalWindow/Modal.module.css"
import statusImage from "../../assets/Images/statusImage.svg"
import closeIcon from "../../assets/Images/closeIcon.svg"
import statusCheckBox from "../../assets/Images/checkBox.svg"
import { getStorageSum } from "../../helpers/storageFunctions"
import { numberFormatRub } from "../../modules/calculator/functions/numberFormatHalper"
import style from "./storagePage.module.css"

function StoragePage({
  categories,
  getCategories,
  storageCategories,
  sum,
  getStorageCategories,
  setCheckMainField,
  setCheckCalculator,
  getOperationList,
  getInputData,
  getBalanceData,
}) {
  const token = useSelector((state) => state.user.token)
  const [modalActive, setModalActive] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [selectedCategory, setSelectedCategory] = useState({})

  let categoryFromStorage = {}
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].categoryName === "Из Накоплений")
      categoryFromStorage = categories[i]
  }

  function createModal(category) {
    setModalMessage(
      `Вы уверены, что хотите перевести накопление ${category.categoryName} в доходы?`
    )
    setModalActive(true)
    setSelectedCategory(category)
  }

  function sendSumToIncome(e, category, incomeCategory) {
    e.preventDefault()

    let data = {
      sum: category.sum,
      category_id: incomeCategory.category_id,
      date: dateOnline,
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }
    fetch(URLS.POSTincomcash, options).then((result) => {
      setModalMessage(
        `Накопление ${category.categoryName} было переведено в доход в категорию "Из Накоплений"`
      )
      getCategories(URLS.getIncomeCategories)
      deleteCategory(e, category)
      setTimeout(() => {
        setModalActive(false)
        setSelectedCategory({})
        setModalMessage("")
      }, 2000)
    })
    getStorageSum(storageCategories)
  }
  function addCategory(e, category) {
    e.preventDefault()

    let data = {
      categoryName: "Из Накоплений",
      category_type: "constant",
      income_outcome: "income",
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }

    fetch(URLS.createCategory, options)
      .then((response) => response.json())
      .then((data) => {
        sendSumToIncome(e, category, data)
        getBalanceData()
      })
  }

  function deleteCategory(e, category) {
    e.preventDefault()
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }

    fetch(`${URLS.deleteCategory}${category.category_id}`, options)
      .then((result) => {
        getStorageCategories(URLS.getMoneyBoxCategories)
      })
      .then(() => {
        setTimeout(() => {
          getBalanceData()
          getOperationList(URLS.last5MoneyBoxOperation, " ")
          setSelectedCategory({})
        }, 2000)
      })
    getStorageSum(storageCategories)
  }

  function sendStorageToIncome(e, category, categories) {
    e.preventDefault()
    let count = 0
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categoryName === "Из Накоплений") {
        count += 1
        console.log(count)
      }
    }
    if (count > 0) sendSumToIncome(e, category, categoryFromStorage)
    else addCategory(e, category)

    count = 0
  }

  useEffect(() => {
    setCheckMainField(true)
    setCheckCalculator(false)
    getOperationList(URLS.last5MoneyBoxOperation, " ")
    getStorageCategories(URLS.getMoneyBoxCategories)
    getCategories(URLS.getIncomeCategories)
    getBalanceData()
    getStorageSum(storageCategories)
  }, [])

  return (
    <>
      <div className={style.main_field}>
        <h2 className={`${style.main_field_title}`}>Накопления</h2>
        <div className={style.main_field_input}>
          <input
            className={style.input_rub}
            value={sum ? numberFormatRub.format(sum) : ""}
            readOnly
          ></input>
        </div>
        <div className={style.main_field_title_label}>
          Общая сумма накоплений
        </div>
        <div className={style.main_field_storage}>
          <InputForm
            title="Накопления"
            type="accumulate"
            income_outcome="money_box"
            symbol=" "
            endpoint={URLS.last5MoneyBoxOperation}
            getOperationList={getOperationList}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            sumCash={URLS.sumOutcomeCash}
            typeOfSum={URLS.POSTmoneyBox}
            categories={storageCategories}
            getCategories={getStorageCategories}
            typeOfCategories={URLS.getMoneyBoxCategories}
            addActive={true}
            storageType={true}
            placeholder={"Введите цель"}
          />
        </div>
        <div className={style.storage_categories}>
          {storageCategories.length > 0 && (
            <div className={`${style.categories_storage_title} ${style.fat}`}>
              <div className={`${style.category_name_storage} ${style.fat}`}>
                Категория
              </div>
              <div className={`${style.grand_total_storage} ${style.fat}`}>
                Цель, руб
              </div>
              <div className={`${style.sum_storage} ${style.fat}`}>
                Сумма, руб
              </div>
            </div>
          )}
          <div className={style.storage_categories_list}>
            {storageCategories &&
              storageCategories.map((category, index) => {
                const doneStorage = category.target - category.sum
                if (!category.is_hidden)
                  return (
                    <div
                      className={style.storage_category_row}
                      key={category.category_id}
                      index={index}
                    >
                      <div className={style.categories_storage_title}>
                        <div className={style.category_name_storage}>
                          {category.categoryName}
                        </div>
                        <div className={style.grand_total_storage}>
                          {numberFormatRub.format(category.target)}
                        </div>
                        {(Boolean(category.sum) || category.sum === 0) && (
                          <div className={style.sum_storage}>
                            <div className={style.sum_storage_content}>
                              {numberFormatRub.format(category.sum)}
                            </div>
                          </div>
                        )}
                      </div>
                      {category.target && !doneStorage && (
                        <>
                          <img
                            className={style.image}
                            src={statusImage}
                            alt="status ok"
                            onClick={() => createModal(category)}
                          />
                          <img
                            className={style.image_checkBox}
                            src={statusCheckBox}
                            alt="status ok"
                            onClick={() => createModal(category)}
                          />
                        </>
                      )}
                    </div>
                  )
              })}
          </div>
        </div>
        <div className={style.mobileSum}>
          <div className={style.mobileSum_input}>
            <div className={style.mainTextSumm}>Общая сумма накоплений</div>
            <input
              className={style.input_rubMobile}
              value={sum ? numberFormatRub.format(sum) : ""}
              readOnly
            ></input>
          </div>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setInput={setModalActive}
      >
        <div
          className={modalStyle.delete_icon}
          onClick={() => setModalActive(false)}
        >
          <img src={closeIcon} alt="X" />
        </div>
        <div className={modalStyle.modal_text}>{modalMessage}</div>
        <div>
          <button
            className={modalStyle.button}
            onClick={(e) =>
              sendStorageToIncome(e, selectedCategory, categories)
            }
          >
            Да
          </button>
          <button
            className={modalStyle.button_cancel}
            onClick={() => setModalActive(false)}
          >
            Нет
          </button>
        </div>
      </Modal>
    </>
  )
}
export default StoragePage
