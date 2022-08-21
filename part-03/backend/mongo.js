const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: '
    + 'node mongo.js <password>')
  process.exit(1)
}

const url = `mongodb+srv://phonebook:${process.argv[2]}`
  + '@cluster0.udiv2cr.mongodb.net/?retryWrites=true&w=majority'

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = new mongoose.model('Contact', contactSchema)

mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length > 3) {
      const name = process.argv[3]
      const number = process.argv[4]

      const contact = new Contact({ name, number })

      return contact.save().then(() => {
        console.log(`Added ${name} number ${number} to the phonebook`)

        return mongoose.disconnect()
      })
    } else {
      Contact.find({}).then((result) => {
        console.log('Phonebook:')

        result.forEach((contact) => {
          console.log(contact.name + ': ' + contact.number)
        })

        mongoose.connection.close()
      })
    }
  })
