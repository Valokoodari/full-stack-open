const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  <div>
    {parts.map(({id, name, exercises}) =>
      <Part key={id} name={name} exercises={exercises} />
    )}
  </div>
)

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
