import { useEffect, useState, useContext } from 'react'

import { ProductContext } from '../../../context/ProductsContext'
import { DataCell } from './DataCell'

const DataRows = () => {
  const [state] = useContext(ProductContext)

  const [quoteMins, setQuoteMins] = useState([])
  const [quoteMaxes, setQuoteMaxes] = useState([])
  const [rowDataByPrice, setRowDataByPrice] = useState([])

  useEffect(() => {
    // mins and maxes
    if (!state.tableData.length || !state.priceType) {
      return
    }

    const mins = state.tableData.map(tablerow => {
      return Math.min(...tablerow['Quotes'].map(item => item[state.priceType]))
    })

    const maxes = state.tableData.map(tablerow => {
      return Math.max(...tablerow['Quotes'].map(item => item[state.priceType]))
    })

    setQuoteMins(mins)
    setQuoteMaxes(maxes)
  }, [state.priceType, state.tableData])

  useEffect(() => {
    // organized data structure for rows
    if (!state.tableData.length) {
      return
    }

    const finalData = state.tableData.map((_, outerIdx) => {
      return state.tableHeaders.map((header, innerIdx) => {
        return innerIdx <= 3
          ? state.tableData[outerIdx][header]
          : state.tableData[outerIdx]['Quotes'][innerIdx - 4][state.priceType]
      })
    })
    setRowDataByPrice(finalData)
  }, [state.tableData, state.priceType, state.tableHeaders])

  return rowDataByPrice.map((row, idx) => (
    <tr key={idx}>
      {row.map((item, innerIdx) => (
        <DataCell
          key={`${innerIdx}_${item}`}
          item={item}
          isAPrice={innerIdx > 3}
          min={Number(quoteMins[idx]) === Number(item)}
          max={Number(quoteMaxes[idx]) === Number(item)}
          selected={state.selectedDataCells[Number(idx)] === Number(innerIdx)}
          row={idx}
          innerIdx={innerIdx}
          isWeight={innerIdx === 3}
        />
      ))}
    </tr>
  ))
}

export { DataRows }
