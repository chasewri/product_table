import { useEffect, useContext } from 'react'

import { Table } from './components/Table'
import { PriceSelect } from './components/PriceSelect'
import { SelectedProducts } from './components/SelectedProducts'

import { ProductContext, actionTypes } from './context/ProductsContext'
import { fetchData } from './utils/utils'

import './App.css'

function App() {
  const [state, dispatch] = useContext(ProductContext)

  useEffect(() => {
    fetchData().then(data => {
      dispatch({
        type: actionTypes.updateTable,
        payload: data
      })
      dispatch({
        type: actionTypes.updateHeaders,
        payload: data
      })
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: actionTypes.updateInvoiceTotal
    })
  }, [state.selectedDataCells])

  return (
    <div className="App">
      <SelectedProducts />
      <PriceSelect />
      <Table />
    </div>
  )
}

export default App
