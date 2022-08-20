const Header = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <b>Number of exercises {total}</b>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
