import { useState } from 'react'


const DisplayHeader = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.goodCounter + props.neutralCounter + props.badCounter === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={props.goodCounter}/>
        <StatisticsLine text='neutral' value={props.neutralCounter}/>
        <StatisticsLine text='bad' value={props.badCounter}/>
        <StatisticsLine text='average' value={props.averageCounter}/>
        <StatisticsLine text='positive' value={props.positiveCounter}/>
      </tbody>
    </table>
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
      <Statistics
        good='good' goodCounter={good}
        neutral='neutral' neutralCounter={neutral}
        bad='bad' badCounter={bad}
        average='average' averageCounter={calcAverage()}
        positive='positive' positiveCounter={`${positivePecentage()} %`}
      />
    </div>
  )
}

export default App