const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument, node mongo.js password')
    process.exit(1)
  }

const password = process.argv[2]

mongoose.set('strictQuery',false)

const url = `mongodb+srv://ademkolenovic:${password}@cluster0.0fylt5m.mongodb.net/`

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

mongoose.connect(url).then(() => {
    console.log('connected')

if (process.argv.length === 3) {
    return Person.find({})
    } else if (process.argv.length === 5) {
        const newName = process.argv[3]
        const newNumber = process.argv[4]
    
        const newPerson = new Person({
            name: newName,
            number: newNumber,
    }
    )
    return newPerson.save()
} else if (process.argv.length === 5) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${persons.number}`)
        })
    })
    ///return new Promise.resolve()
    }
}).then((savedPerson) => {
    if (savedPerson){
        console.log(`added ${savedPerson.name} number ${savedPerson.number} ${savedPerson.number} to phonebook`)
        mongoose.connection.close()
    }
})
