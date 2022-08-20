import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contactService.getAll().then(initialContacts =>
      setContacts(initialContacts)
    )
  }, [])

  const handleNameChange = (event) =>
    setNewName(event.target.value)
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)
  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const createNotification = notification => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 5000)
  }

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = { name: newName, number: newNumber }

    if (contacts.some(contact => contact.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace `
        + 'the old number with a new one?')) {
        const id = contacts.find(contact => contact.name === newName).id

        contactService.update(id, contactObject).then(returnedContact => {
          setContacts(contacts.map(contact =>
            contact.id === id ? returnedContact : contact))
          createNotification({
            message: `The number of ${newName} has been updated.`,
            type: 'success'
          })
        }).catch(_ => {
          createNotification({
            message: `Could not update the number of ${newName}!`,
            type: 'error'
          })
        })
      }
      return
    }

    contactService.create(contactObject).then(returnedContact => {
      setContacts(contacts.concat(returnedContact))
      setNewNumber('')
      setNewName('')

      createNotification({
        message: `${newName} has been added to the phonebook.`,
        type: 'success'
      })
    }).catch(_ => {
      createNotification({
        message: `Could not add ${newName} to the phonebook!`,
        type: 'error'
      })
    })
  }

  const deleteContact = (id) => {
    const name = contacts.find(contact => contact.id === id).name

    if (window.confirm(`Delete ${name}?`)) {
      contactService.remove(id).then(_ => {
        setContacts(contacts.filter(contact => contact.id !== id))

        createNotification({
          message: `${name} has been deleted from the phonebook.`,
          type: 'success'
        })
      }).catch(_ => {
        createNotification({
          message: `Could not delete ${name} from the phonebook!`,
          type: 'error'
        })
      })
    }
  }

  const contactsToShow = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification notification={notification} />

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
      <Contacts contacts={contactsToShow} onDelete={deleteContact} />
    </div>
  )
}

export default App
