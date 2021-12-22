import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { addCommas } from '../../utils/utils'

import './selectedProducts.css'

const SelectedProducts = () => {
  const [state] = useContext(ProductContext)
  const { weight, invoice, average } = { ...state.currentInvoiceTotal }

  return (
    <div className="selected-products">
      <div className="metric">
        Total Pounds: <span>{weight / 1000}k</span>
      </div>
      <div className="metric">
        Invoice: <span>${addCommas((invoice / 10 ** 3).toFixed(2))}</span>
      </div>
      <div className="metric">
        Avg $/CWT: <span>${average.toFixed(2)}</span>
      </div>
    </div>
  )
}

export { SelectedProducts }
