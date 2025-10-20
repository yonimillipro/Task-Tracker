import PropTypes from "prop-types";

import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  // const location = useLocation();
  // const onClick = (e) => {
  //   // console.log("task added.",e);
  //   alert("task added.");
  // };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close Task.." : "Add Task... "}
        onClick={onAdd}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

// <Button
//   color={"yellow"}
//   text={"Edit"}
//   // onClick={onAdd}
// />{" "}
// <Button
//   color={"red"}
//   text={"Delete"}
//   // onClick={onAdd}
// />{" "}
// <Button
//   color={"black"}
//   text={"Update"}
//   // onClick={onAdd}
// />
export default Header;
