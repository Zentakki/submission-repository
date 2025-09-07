import { useState, useEffect } from 'react'
import countriesService from './components/countries'

const Country = ({country}) => {
  const languages = Object.entries(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(([code,name]) =>
          (<li key={code}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

const Countries = ({countries, search}) => {
  if (!search) return null
  if (countries.length === 0) return <p>No matches</p>
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(c => (
            <li key={c.id}>{c.name.common}</li>
          ))}
      </ul>
    )
  }
  // countries.length === 1, show more info about the country
  return <Country country={countries[0]}/>
}

const App = () => {
  const [cSearch, setCSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAllCountries()
      .then(allCountries => setCountries(allCountries))
  }, [])

  let filteredCountries = cSearch != ''
    ? countries.filter(c =>
      c.name.common.toLowerCase().includes(cSearch)
    )
    : []

  const handleFindCountry = (event) => {
    setCSearch(event.target.value)
  }

  return (
    <div>
      Find Country <input value={cSearch} onChange={handleFindCountry}/>
      <Countries countries={filteredCountries} search={cSearch}/>
    </div>
  )
}

export default App