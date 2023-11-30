const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument, node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://ademkolenovic:${password}@cluster0.0fylt5m.mongodb.net/`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
  content: 'MongoDB is nice',
  important: true,
})
*/
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})