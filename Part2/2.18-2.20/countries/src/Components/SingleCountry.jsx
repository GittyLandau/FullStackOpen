import Weather from "./Weather";
const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p> <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={Object.values(country.flags)[0]}></img>
      {/* <Weather lat={country.latlng[0]} long={country.latlng[1]}></Weather> */}
    </div>
  );
};

export default SingleCountry;
