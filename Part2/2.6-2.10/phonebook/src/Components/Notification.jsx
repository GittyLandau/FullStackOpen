const Notification = ({ notification, type }) => {
  if (notification === null) {
    return null;
  }
  return (
    <div className={type == "error" ? "error" : "success"}>{notification}</div>
  );
};
export default Notification;
