import Country from "./Country"

const Countries = ({countries, setFilter}) => {
  if (countries.length === 1)
    return <Country country={countries[0]} />

  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>

  return countries.map(country =>
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => setFilter(country.name.common)}>show</button>
    </div>)
}

export default Countries
