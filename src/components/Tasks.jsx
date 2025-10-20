import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  //   const tasks = [
  //     {
  //       id: 1,
  //       text: "Doctors Appointment",
  //       day: "Feb 5th at 2:30pm",
  //       reminder: true,
  //     },
  //     {
  //       id: 2,
  //       text: "Meeting at School",
  //       day: "Feb 6th at 1:30pm",
  //       reminder: true,
  //     },
  //   ];
  return (
    <>
      {tasks.map((task, key) => (
        <Task key={key} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
