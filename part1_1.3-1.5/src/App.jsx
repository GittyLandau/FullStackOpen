const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const App = () => {
  let course = {
    course: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };
  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]}></Part>
        <Part part={props.parts[1]}></Part>
        <Part part={props.parts[2]}></Part>
      </div>
    );
  };
  const Part = (props) => {
    return (
      <p>
        {props.part.part} {props.part.exercises}
      </p>
    );
  };
  const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    );
  };
  return (
    <div>
      <Header course={course.course}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default App;
