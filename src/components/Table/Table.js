import { useContext } from 'react'
import { DataRows } from './components'
import { ProductContext } from '../../context/ProductsContext'
import './Table.css'

const Table = () => {
  const [state] = useContext(ProductContext)

  return state.tableData.length && state.tableHeaders.length ? (
    <table className="table">
      <thead>
        <tr>
          {state.tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <DataRows />
      </tbody>
    </table>
  ) : null
}

export { Table }
