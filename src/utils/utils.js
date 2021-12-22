import json from '../data/tableData.json'

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const jsonData = json

    if (!jsonData) {
      setTimeout(reject, 500, 'No data!')
    }
    setTimeout(resolve, 500, jsonData)
  })
}

const addCommas = x => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

const fixFloatingPoint = val => Number.parseFloat(val.toPrecision(15))

export { addCommas, fetchData, fixFloatingPoint }
