import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === "") {
      return
    }

    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data[0])
      })
      .catch(_ => {
        setCountry(null)
      })
  }, [name])

  return country
}
