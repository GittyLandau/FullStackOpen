import Part from "./Part";
import Total from "./Total";
const Content = (props) => {
  return (
    <div>
      <ul>
        {props.parts.map((part) => (
          <Part part={part} key={part.id}></Part>
        ))}
      </ul>
      <Total
        amount={props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      ></Total>{" "}
    </div>
  );
};
export default Content;
