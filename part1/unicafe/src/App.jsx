import { useState } from 'react'


const DisplayHeader = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const DisplayCounter = (props) => {
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

  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => {
    return setBad(bad + 1)
  }



  return (
    <div>
      <DisplayHeader text='Give Feedback'/>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <DisplayHeader text='Statistics'/>
      <DisplayCounter text='good' counter={good}/>
      <DisplayCounter text='neutral' counter={neutral}/>
      <DisplayCounter text='bad' counter={bad}/>
    </div>
  )
}

export default App