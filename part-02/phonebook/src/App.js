import { useState } from 'react'

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

      search by name <input onChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>

      <h2>Contacts</h2>
      {contactsToShow.map(({name, number}) =>
        <div key={name}>
          {name} {number}
        </div>
      )}
    </div>
  )
}

export default App
