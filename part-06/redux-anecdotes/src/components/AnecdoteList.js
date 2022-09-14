import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === "") {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const handleVote = (id) => {
    dispatch(vote(id))
    dispatch(createNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}{" "}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
