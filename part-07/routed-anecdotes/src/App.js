import { useState } from "react"
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from "react-router-dom"

import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import CreateNew from "./components/CreateNew"
import Anecdote from "./components/Anecdote"
import Footer from "./components/Footer"
import About from "./components/About"
import Menu from "./components/Menu"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)
  const [notificationTimeout, setNotificationTimeout] = useState(null)

  const createNotification = (message) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    setNotification(message)
    setNotificationTimeout(setTimeout(() => {
      setNotification(null)
    }, 5000))
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Routes>
          <Route path="/create" element={<CreateNew addNew={addNew} createNotification={createNotification} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes" element={ <Navigate to="/" /> } />
          <Route path="/about" element={<About />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
