import { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const Filter = ({value, onChange}) =>
  <div>find countries <input value={value} onChange={onChange} /></div>

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />

      <Countries countries={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App
