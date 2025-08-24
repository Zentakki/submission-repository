import { useState } from 'react'


const DisplayHeader = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Statistics = (props) => {
  return (
    <div>{props.text} {props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // simplified
  const increaseNeutral = () => setNeutral(neutral + 1)

  // with { }
  const increaseBad = () => {
    return setBad(bad + 1)
  }

  const calcAverage = () => {
    const total = good + neutral + bad
    // to avoid errors on first load when there is no votes
    if (total === 0) return 0
    return (good - bad) / total
  }

  const positivePecentage = () => {
    const total = good + neutral + bad
    // to avoid errors on first load when there is no votes
    if (total === 0) return 0
    const percentage = (good / total) * 100
    return percentage
  }



  return (
    <div>
      <DisplayHeader text='Give Feedback'/>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <DisplayHeader text='Statistics'/>
      <Statistics text='good' counter={good}/>
      <Statistics text='neutral' counter={neutral}/>
      <Statistics text='bad' counter={bad}/>
      <Statistics text='average' counter={calcAverage()}/>
      <Statistics text='positive' counter={`${positivePecentage()} %`}/>
    </div>
  )
}

export default App