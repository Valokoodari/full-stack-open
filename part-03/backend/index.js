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

app.get('/info', (_, res, next) => {
  const date = new Date()
  Contact.find({}).then(contacts => {
    res.send(`
      <p>Phonebook has info for ${contacts.length} people</p>
      <p>${date}</p>
    `)
  }).catch(error => next(error))
})

app.get('/api/persons/', (_, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  }).catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
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
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id).then(contact => {
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const contact = req.body

  const updatedContact = {
    name: contact.name,
    number: contact.number
  }

  Contact.findByIdAndUpdate(req.params.id, updatedContact, { new: true })
    .then(updated => {
      res.json(updated)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})

const errorHandler = (err, _, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
