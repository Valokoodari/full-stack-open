const Contact = require('./models/contact')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('post-data', (req) => {
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

app.get('/persons/', (_, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  }).catch(error => next(error))
})

app.post('/persons/', (req, res, next) => {
  const contact = req.body

  const newContact = new Contact({
    name: contact.name,
    number: contact.number
  })

  newContact.save().then(savedContact => {
    res.json(savedContact)
  }).catch(error => next(error))
})

app.get('/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id).then(contact => {
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.put('/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Contact.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: false, runValidators: true, context: 'query' }
  ).then(updated => {
    if (updated) {
      res.json(updated)
    } else {
      res.status(404).send({ error: 'contact not found' })
    }
  }).catch(error => next(error))
})

app.delete('/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, _, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    })
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).send({
      error: 'A contact with the given name already exists.'
    })
  }

  next(err)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
