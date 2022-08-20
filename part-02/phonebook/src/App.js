import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/contacts')
      .then(response => setContacts(response.data))
  }, [])

  const handleNameChange = (event) =>
    setNewName(event.target.value)
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)
  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = { name: newName, number: newNumber }

    if (contacts.some(contact => contact.name === newName)) {
      alert(`${newName} is already in the phonebook.`)
      return
    }

    axios
      .post('http://localhost:3001/contacts', contactObject)
      .then(response => setContacts(contacts.concat(response.data)))

    setNewNumber('')
    setNewName('')
  }

  const contactsToShow = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <ContactForm
        onSubmit={addContact}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Contacts</h2>
      <Contacts contacts={contactsToShow} />
    </div>
  )
}

export default App
