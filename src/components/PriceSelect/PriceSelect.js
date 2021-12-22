import { useContext } from 'react'
import { ProductContext, actionTypes } from '../../context/ProductsContext'

import './priceSelect.css'

const PriceSelect = () => {
  const [state, dispatch] = useContext(ProductContext)

  const handleSelectChange = e => {
    dispatch({ type: actionTypes.updatePricetype, payload: e.target.value })
  }
  return (
    <div className="priceSelect">
      <select value={state.priceType} onChange={handleSelectChange}>
        {state.priceOptions.length
          ? state.priceOptions.map(obj => (
              <option key={obj.value} value={obj.value}>
                {obj.label}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
export { PriceSelect }
