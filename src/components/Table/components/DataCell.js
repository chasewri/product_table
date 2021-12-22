import { useContext } from 'react'
import { ProductContext, actionTypes } from '../../../context/ProductsContext'
import { addCommas } from '../../../utils/utils'

const DataCell = ({
  item,
  isAPrice,
  min,
  max,
  selected,
  row,
  innerIdx,
  isWeight
}) => {
  const [_, dispatch] = useContext(ProductContext)

  if (isAPrice) {
    return (
      <td
        className={`${min && 'lightgreen-background'} ${
          max && 'red-background'
        } ${selected && 'selected'}`}
        onClick={() =>
          dispatch({
            type: actionTypes.updateSelectedCells,
            payload: [row, innerIdx]
          })
        }
      >
        {Number(item).toFixed(2)}
      </td>
    )
  } else if (isWeight) {
    return <td>{addCommas(item)}</td>
  } else {
    return <td>{item}</td>
  }
}

export { DataCell }
