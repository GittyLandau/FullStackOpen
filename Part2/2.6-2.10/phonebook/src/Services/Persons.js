import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const create = (object) => {
  return axios.post(baseURL, object).then((response) => response.data);
};

const update = (object, id) => {
  return axios
    .put(`${baseURL}/${id}`, object)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((response) => {});
};

export default { getAll, create, update, deletePerson };
