import { useReducer, createContext } from 'react'

import { fixFloatingPoint } from '../utils/utils'

const ProductContext = createContext()

const initialState = {
  tableData: [],
  tableHeaders: [],
  priceOptions: [
    {
      label: 'Final Price',
      value: 'FinalPrice'
    },
    {
      label: 'Freight Fee',
      value: 'FreightFee'
    },
    {
      label: 'Packaging Fee',
      value: 'PackagingFee'
    }
  ],
  priceType: 'FinalPrice',
  currentInvoiceTotal: {
    weight: 0,
    invoice: 0,
    average: 0
  },
  selectedDataCells: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TABLE':
      return {
        ...state,
        tableData: action.payload
      }
    case 'HEADERS':
      const [firstDataItem] = action.payload
      const headerKeys = Object.keys(firstDataItem)
      const quotesStr = headerKeys.pop()

      firstDataItem[quotesStr].forEach(quote => {
        headerKeys.push(quote.Company)
      })

      return {
        ...state,
        tableHeaders: headerKeys
      }

    case 'PRICETYPE':
      return {
        ...state,
        priceType: action.payload
      }

    case 'TOTAL_INVOICE':
      const filteredSelections = state.selectedDataCells.filter(Boolean)
      if (!filteredSelections.length) {
        return {
          ...state,
          currentInvoiceTotal: {
            weight: 0,
            invoice: 0,
            average: 0
          }
        }
      }

      const selectedCellsMapped = state.selectedDataCells
        .map((item, idx) => {
          if (!item) return null

          return {
            weight: state.tableData[idx].Weight,
            price: state.tableData[idx].Quotes[item - 4].FinalPrice
          }
        })
        .filter(Boolean)

      const newComputedWeight = selectedCellsMapped
        .map(item => item.weight)
        .reduce((a, b) => a + b)
      const newTotalInvoice = selectedCellsMapped
        .map(item =>
          fixFloatingPoint((item.weight / 10 ** 2) * (item.price * 10 ** 3))
        )
        .reduce((a, b) => a + b)
      const newAverage = newTotalInvoice / newComputedWeight / 10

      return {
        ...state,
        currentInvoiceTotal: {
          weight: newComputedWeight,
          invoice: newTotalInvoice,
          average: newAverage
        }
      }

    case 'SELECTED_CELLS':
      const [row, item] = action.payload
      const newSelectionArr = [...state.selectedDataCells]

      if (state.selectedDataCells[row] === item) {
        newSelectionArr[row] = null
        return {
          ...state,
          selectedDataCells: newSelectionArr
        }
      }

      newSelectionArr[row] = item
      return {
        ...state,
        selectedDataCells: newSelectionArr
      }

    default:
      return state
  }
}

const ProductDataProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  )
}

const actionTypes = {
  updateTable: 'TABLE',
  updateHeaders: 'HEADERS',
  updatePricetype: 'PRICETYPE',
  updateInvoiceTotal: 'TOTAL_INVOICE',
  updateSelectedCells: 'SELECTED_CELLS'
}

export { ProductDataProvider, ProductContext, actionTypes }
