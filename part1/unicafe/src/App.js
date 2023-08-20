import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
}

const increment = (state, setState) => () => setState(state + 1)

const StatisticsLine = ({text, value}) => {
  return (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral
  const average = (good-bad) / total
  const positive = good/total * 100 + ' %'

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="total" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))


  const handleRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVotes = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }  

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increment(good, setGood)} text="good"/>
      <Button onClick={increment(neutral, setNeutral)} text="neutral"/>
      <Button onClick={increment(bad, setBad)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br />
      <h1>anecdotes</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleRandom}>next anecdote</button>
    </div>
  )
}

export default App