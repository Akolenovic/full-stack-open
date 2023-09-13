const Part = ({part}) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
  const Header = ({heading}) => <h1>{heading}</h1>
  
  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part}/>
        ))}
    </div>
  )
  
  const Total = ({parts}) => (
    <p>
      <strong>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</strong>
    </p>)
  
  
const Courses = ({courses}) => (
    <>
    <h1>Web development curriculum</h1>
      {courses.map(course =>
        (  <div>
          <Header heading={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts} />
          </div>)
        )}
    </>
  )

  export default Courses