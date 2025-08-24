import { useState } from 'react'

const DisplayTop = ({anecdotes, votes}) => {
  const topIndex = votes.indexOf(Math.max(...votes))

  if (votes[topIndex] === 0) {
    return <p>No votes yet</p>
  }

  return (
    <>
      <p>{anecdotes[topIndex]}</p>
      <p>has {votes[topIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [hasVoted, setHasVoted] = useState(false)

  const newRandomSelected = () => {
    let randomSelection = Math.floor(Math.random() * anecdotes.length)
    while (randomSelection === selected) {
      // use console.count to see the message better
      // console.log doesn't repeat the same message
      console.count('Same selected anecdote, generating another..')
      randomSelection = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomSelection)
    setHasVoted(false)
  }

  const incrementVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    setHasVoted(true)
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={incrementVote} disabled={false}>vote</button>
      <button onClick={newRandomSelected}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <DisplayTop anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App