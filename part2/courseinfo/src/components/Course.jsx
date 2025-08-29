const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const SubHeader = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      <SubHeader key={course.id} course={course.name}/>
      {
        course.parts.map( part =>
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )
      }
      <p>
        Total of exercises: {total}
      </p>
    </>
  )
}

export default Course