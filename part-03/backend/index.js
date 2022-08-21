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

let contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (_, res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${contacts.length} people </p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/', (_, res) => {
  res.json(contacts)
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
  } else if (contacts.find(c => c.name === contact.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  contact.id = Math.floor(Math.random() * 2000000000)
  contacts = contacts.concat(contact)

  res.json(contact)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
