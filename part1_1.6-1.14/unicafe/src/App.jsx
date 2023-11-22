import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const handleGood = () => {
    setGood(() => good + 1);
  };
  const handleBad = () => {
    setBad(() => bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(() => neutral + 1);
  };

  return (
    <div>
      <Header text="Give Feedback"></Header>
      <Button text="Good" clickHandler={handleGood}></Button>
      <Button text="Neutral" clickHandler={handleNeutral}></Button>
      <Button text="Bad" clickHandler={handleBad}></Button>
      <Header text="Statistics"></Header>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  );
};
const Statistics = (props) => {
  const calculateAvg = () => {
    return (
      (props.good || props.bad) &&
      (props.good - props.bad) / (props.good + props.bad + props.neutral)
    );
  };
  const calculatePos = () => {
    return (
      (props.good || props.bad) &&
      (props.good / (props.bad + props.neutral + props.good)) * 100
    );
  };
  return props.good || props.bad || props.neutral ? (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good}></StatisticLine>
        <StatisticLine text="Neutral" value={props.neutral}></StatisticLine>
        <StatisticLine text="Bad" value={props.bad}></StatisticLine>
        <StatisticLine
          text="All"
          value={props.good + props.bad + props.neutral}
        ></StatisticLine>
        <StatisticLine text="Average" value={calculateAvg()}></StatisticLine>
        <StatisticLine text="Positive" value={calculatePos()}></StatisticLine>
      </tbody>
    </table>
  ) : (
    "No Feedback Given"
  );
};
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
const Header = (props) => {
  return <h1>{props.text}</h1>;
};
const Button = (props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.clickHandler();
      }}
    >
      {props.text}
    </button>
  );
};
export default App;
