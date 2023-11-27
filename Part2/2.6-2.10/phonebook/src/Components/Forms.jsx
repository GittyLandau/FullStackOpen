import { useState } from "react";
import Persons from "../Services/Persons";
const Form = (props) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (newName && newNumber) {
          //Check if already entered
          let filteredArr = props.persons.filter((person) => {
            return person.name === newName;
          });
          if (filteredArr.length <= 0) {
            const personObj = {
              name: newName,
              number: newNumber,
            };
            Persons.create(personObj).then((response) =>
              props.setPersons(props.persons.concat(response))
            );
            //Display message
            props.setNotificationType("success");
            props.setNotification(`${newName} was added successfully`);
            setTimeout(() => {
              props.setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          } else {
            if (
              filteredArr[0].number
                .trim()
                .replace(/\s/g, "")
                .replace(/\-/g, "") ===
              newNumber.trim().replace(/\s/g, "").replace(/\-/g, "")
            ) {
              alert(`${newName} is already added to the phonebook.`);
              setNewName("");
              setNewNumber("");
            } else {
              if (
                window.confirm(
                  `${filteredArr[0].name} is already added to the phonebook. Do you wish to update the phone number to ${newNumber}?`
                )
              ) {
                Persons.update(
                  { ...filteredArr[0], number: newNumber },
                  filteredArr[0].id
                )
                  .then(() => {
                    //Set persons to updated number
                    let newArr = [...props.persons];
                    newArr.forEach(
                      (person) =>
                        (person.number =
                          person.id === filteredArr[0].id
                            ? newNumber
                            : person.number)
                    );
                    props.setPersons([...newArr]);
                    //Set message
                    props.setNotificationType("success");
                    props.setNotification(
                      `${filteredArr[0].name} was updated successfully`
                    );
                    setTimeout(() => {
                      props.setNotification(null);
                    }, 5000);
                    setNewName("");
                    setNewNumber("");
                  })
                  .catch((error) => {
                    props.setNotificationType("error");
                    props.setNotification(
                      `Information on ${filteredArr[0].name} was already removed from server`
                    );
                    setTimeout(() => {
                      props.setNotification(null);
                    }, 5000);
                  });
              }
            }
          }
        } else {
          alert("Please enter both fields.");
        }
      }}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={newName}
          onChange={(e) => setNewName(() => e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="number">Number:</label>
        <input
          type="text"
          id="number"
          value={newNumber}
          onChange={(e) => setNewNumber(() => e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
