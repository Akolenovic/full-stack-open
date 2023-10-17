var express = require('express')
var morgan = require('morgan')

const app = express()

morgan.token('body', (request, response) =>
 request.method === `POST` ? JSON.stringify(request.body) : ''
 )

app.use(
  morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.body(request, response)
  ].join(' ')
}))
app.use(express.json())

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    },
    {
      id: 5,
      name: "Henry Cook",
      number: "40-28-6243122"
    }
]

const generateId = () => {
  return (
    Math.floor(Math.random() * 1000000 + 1)
    )}

app.get('/', function (request, response){
  response.send('hello world!')
})

app.get('/info', (request, response) => {
  const repsonseText = 
`  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`

  response.send(repsonseText)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => id === person.id) 

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
    console.log('ID not found')
  }
})


app.post('/api/persons', (request, response) => {
  const id = generateId()

  if (!request.body.name || !request.body.number)  {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const foundPerson = persons.find(person => person.name === request.body.name)
  if (foundPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    id,
    name: request.body.name,
    number: request.body.number,
  }
  persons = persons.concat(person)
  response.json(person)


})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)  
})
