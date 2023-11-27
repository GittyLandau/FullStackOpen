import { useState, useEffect } from "react";
import Display from "./Components/Display";
import Form from "./Components/Forms";
import Filter from "./Components/Filter";
import axios from "axios";
import Persons from "./Services/Persons";
import Notification from "./Components/Notification";
const App = () => {
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 0, number: "718 - 725 - 7580" },
  ]);
  useEffect(() => {
    Persons.getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deletePerson = (id) => {
    Persons.deletePerson(id)
      .then((response) => {
        const newArr = persons.filter((person) => person.id !== id);
        setPersons(newArr);
        //Display message
        let deletedPerson = persons.find((person) => person.id == id);
        setNotificationType("success");
        setNotification(`${deletedPerson.name} was deleted successfully`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((e) => {
        let deletedPerson = persons.find((person) => person.id == id);
        setNotificationType("error");
        setNotification(
          `Information on ${deletedPerson.name} was already removed from server`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };
  const [filter, setFilter] = useState("");
  let arrayToShow = persons;
  //Filter array
  if (filter) {
    arrayToShow = persons.filter((person) => {
      return (
        person.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(filter.toLowerCase().replace(/\s/g, "")) ||
        person.number
          .trim()
          .replace(/\s/g, "")
          .replace(/\-/g, "")
          .includes(filter.trim().replace(/\s/g, "").replace(/\-/g, ""))
      );
    });
  } else {
    arrayToShow = persons;
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        type={notificationType}
        notification={notification}
      ></Notification>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <h3>Add a New</h3>
      <Form
        setNotificationType={setNotificationType}
        setNotification={setNotification}
        persons={persons}
        setPersons={setPersons}
      ></Form>
      <h3>Numbers</h3>
      <Display arrayToShow={arrayToShow} deletePerson={deletePerson}></Display>
    </div>
  );
};

export default App;
