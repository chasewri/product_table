import React from 'react'
import ReactDOM from 'react-dom'
import { ProductDataProvider } from './context/ProductsContext'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ProductDataProvider>
      <App />
    </ProductDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
