import React, { useState } from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useRouteMatch
} from "react-router-dom"

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const Anecdote = ({ anecdote }) => {
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2><br/>
      <p>has {anecdote.votes} votes</p> <br/>
      <p>for more info see{anecdote.info}</p>
    </div>
  )
}

const Anecdotes = ({ anecdotes }) => {
  console.log(anecdotes);
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  
  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/anecdotes/:id')
  
  const anec = match 
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
  : null

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



  const Footer = () => (
    <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
  
      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )

  return (
      <div>
        <div>
            <h1>Software anecdotes</h1>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/">about</Link>

        </div>

        <Switch>
            <Route path="/anecdotes/:id">
                <Anecdote anecdote={anec}/>
            </Route>
            <Route path="/create">
                <CreateNew addNew={addNew}/>
            </Route>
            <Route path="/">
              <Anecdotes anecdotes={anecdotes} />
            </Route>
        </Switch>
        <br/>
        <div>
          <Footer />
        </div>
      </div>  

  )
}

export default App;