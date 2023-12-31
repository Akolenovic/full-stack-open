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
    </div>
  )
}

export default App