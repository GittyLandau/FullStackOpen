import Header from "./Header";
import Content from "./Content";
const Course = (props) => {
  return (
    <div>
      <Header text={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
    </div>
  );
};
export default Course;
