require('dotenv').config()
const Contact = require('./models/contact')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('post-data', (req, _) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - '
  + ':response-time ms :post-data'))

app.get('/info', (_, res) => {
  const date = new Date()
  Contact.find({}).then(contacts => {
    res.send(`
      <p>Phonebook has info for ${contacts.length} people</p>
      <p>${date}</p>
    `)
  })
})

app.get('/api/persons/', (_, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.post('/api/persons/', (req, res) => {
  const contact = req.body

  if (!contact.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (!contact.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const newContact = new Contact({
    name: contact.name,
    number: contact.number
  })

  newContact.save().then(savedContact => {
    res.json(savedContact)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id).then(contact => {
    res.json(contact)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
