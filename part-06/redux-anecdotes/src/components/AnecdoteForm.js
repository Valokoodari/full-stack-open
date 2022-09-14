import { connect } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(content)
    props.createNotification(`you created '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNotification,
  createAnecdote
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm
