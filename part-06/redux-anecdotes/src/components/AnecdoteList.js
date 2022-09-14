import { connect } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = (props) => {
  const handleVote = (id) => {
    props.vote(id)
    props.createNotification(`you voted '${props.anecdotes.find(anecdote => anecdote.id === id).content}'`, 5)
  }

  return (
    <div>
      {[...props.anecdotes]
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

const mapStateToProps = (state) => {
  if (state.filter === "") {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }
}

const mapDispatchToProps = {
  createNotification,
  vote
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
