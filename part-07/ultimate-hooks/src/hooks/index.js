import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(response.data))
      }
    )
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
