const Person = (props) => {
  return (
    <li>
      {props.name} {props.number}{" "}
      <button
        onClick={(e) => {
          window.confirm(`Are you sure you want to delete ${props.name}?`) &&
            props.deletePerson(props.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Person;
