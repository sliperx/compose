import { numberFormatRub } from "../../../calculator/functions/numberFormatHalper"
import s from "./Transaction.module.css"

function Transaction({ operationItem, index, symbol }) {
  return (
    operationItem.sum !== 0 && (
      <div className={s.operation} key={index} id={operationItem.id}>
        <div className={s.operation_list_item1}>{operationItem.date}</div>
        <div className={s.operation_list_item}>
          {operationItem.categoryName}
        </div>
        <div className={s.operation_list_item}>
          {symbol}
          {numberFormatRub.format(operationItem.sum)}
        </div>
      </div>
    )
  )
}

export default Transaction
