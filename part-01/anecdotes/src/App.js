import { useState } from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
    <i>{anecdote.text}</i><br />
    has {anecdote.votes} votes
  </div>
)

const App = () => {
  const anecdoteTexts = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [anecdotes, setAnecdotes] =
    useState(anecdoteTexts.map(text => ({ text, votes: 0 })))

  const randInt = (n) => Math.floor(Math.random() * n)

  const nextAnecdote = () =>
    setSelected(randInt(anecdotes.length))

  const voteAnecdote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].votes += 1
    setAnecdotes(newAnecdotes)
  }
   
  const [selected, setSelected] = useState(randInt(anecdotes.length))

  return (
    <div>
      <h1>Anecdote of the Day</h1>

      <Anecdote anecdote={anecdotes[selected]} />

      <button onClick={voteAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>

      <h2>Anecdote with the most votes</h2>

      <Anecdote anecdote={anecdotes.reduce((a, b) => a.votes > b.votes ? a : b)} />
    </div>
  )
}

export default App
