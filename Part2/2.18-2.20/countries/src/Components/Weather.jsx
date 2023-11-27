import axios from "axios";
const Weather = (props) => {
  axios
    .get(
      `https://api.tomorrow.io/v4/weather/forecast?location=${props.lat},${props.long}&apikey=3MqHLiG4V89hcOZnnx86ArmroXwGxeNP`
    )
    .then((response) => {
      console.log(response);
    });
  return <div></div>;
};
export default Weather;
