import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const dbUrl = 'http://localhost:3001/countries'

const getAllCountries = () => {
    const getCountries = axios.get(dbUrl)
    return getCountries.then(response => response.data)
}

export default {getAllCountries}