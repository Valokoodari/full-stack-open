import { useState } from 'react'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    setContacts(contacts.concat(contactObject))
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
