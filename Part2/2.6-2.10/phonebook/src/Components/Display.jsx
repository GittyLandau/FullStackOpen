import Person from "./Person";
const Display = (props) => {
  return (
    <ol>
      {props.arrayToShow.map((person) => (
        <Person
          deletePerson={props.deletePerson}
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
        ></Person>
      ))}
    </ol>
  );
};

export default Display;
