import { useState } from 'react'

const Button = ({text, onClick}) => 
  <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) =>
  <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const positive = all ? good / all * 100 : "-"
  const average = all ? (good - bad) / (good + bad + neutral) : "-"

  return (
    <div>
      <h2>Statistics</h2>

      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good+neutral+bad} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive + " %"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>

      <Button text="good" onClick={() => setGood(good+1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral+1)} />
      <Button text="bad" onClick={() => setBad(bad+1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App