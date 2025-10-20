import Header from "./components/Header";
import Tasks from "./components/Tasks";
import React, { useEffect, useState } from "react";
import AddTask from "./components/addTask";
import Footer from "./components/Footer";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      await fetchTasks();
    };
    getTask();
  }, []);

  // Fetch all tasks
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch failed:", error.message);
      setTasks([]);
      setError("Could not load tasks. Is the server running?");
    }
  }

  // Fetch single task
  const feactTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch task ${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error.message);
      setError(`Could not fetch task ${id}`);
      return null;
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error.message);
      setError("Could not add task");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete task ${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error.message);
      setError(`Could not delete task ${id}`);
    }
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await feactTask(id);
    if (!taskToToggle) return;

    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      if (!res.ok) throw new Error(`Failed to update task ${id}`);
      const data = await res.json();

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      );
    } catch (error) {
      console.error(error.message);
      setError(`Could not update task ${id}`);
    }
  };

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showAddTask && <AddTask onAdd={addTask} />}
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "There is no task"
      )}
      <Footer />
    </div>
  );
}

export default App;

// import Header from "./components/Header";
// import Tasks from "./components/Tasks";
// import React, { useEffect, useState } from "react";
// import AddTask from "./components/addTask";
// import Footer from "./components/Footer";

// function App() {
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const getTask = async () => {
//       const taskFromServer = await feactTasks();
//       setTasks(taskFromServer);
//     };
//     getTask();
//   }, []);

//   //feacth all tasks
//   const feactTasks = async () => {
//     const res = await fetch("http://localhost:5000/tasks");

//     const data = await res.json();

//     return data;
//     // setTasks(data);
//   };

//   //fecth single task
//   const feactTask = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`);

//     const data = await res.json();

//     return data;
//   };

//   const addTask = async (task) => {
//     // console.log("task added", task);
//     // const id = Math.floor(Math.random() * 1000) + 1;

//     // const newTask = { id, ...task };

//     // setTasks([...tasks, newT(ask]);
//     const res = await fetch("http://localhost:5000/tasks", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(task),
//     });
//     const newTask = await res.json();

//     setTasks([...tasks, newTask]);
//   };
//   const deleteTask = async (id) => {
//     //console.log("delete task with id=", id);
//     await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: "DELETE",
//     });
//     setTasks(tasks.filter((task) => task.id !== id));
//   };
//   const toggleReminder = async (id) => {
//     const taskToToggle = await feactTask(id);
//     const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

//     //console.log(id);
//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(updTask),
//     });

//     const data = await res.json();
//     // var age =19;
//     //   if(age >= 18){
//     //   console.log("You can drink")
//     //   }else{
//     //     console.log("you are not old enough")
//     //   }
//     //   let result = age >= 18 ?"You can drink":"you are not old enough"

//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, reminder: data.reminder } : task
//       )
//     );
//   };
//   return (
//     <div className="container">
//       <Header
//         title="Task Tracker"
//         onAdd={() => setShowAddTask(!showAddTask)}
//         showAdd={showAddTask}
//       />
//       {showAddTask && <AddTask onAdd={addTask} />}
//       {tasks.length > 0 ? (
//         <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
//       ) : (
//         "There is no task"
//       )}
//       <Footer />
//     </div>
//   );
// }

// export default App;

// const [tasks, setTasks] = useState([
//   {
//     id: 1,
//     text: "Doctors Appointment",
//     day: "Feb 5th at 2:30pm",
//     reminder: true,
//   },
//   {
//     id: 2,
//     text: "Meeting at School",
//     day: "Feb 6th at 3:00pm",
//     reminder: true,
//   },
//   {
//     id: 3576,
//     text: "job interview",
//     day: "jun 15 at 1:30pm",
//     reminder: false,
//   },
// ]);
// const newTask = {
//   id: 322,
//   text: "new way add obj",
//   day: "jun 15 at 1:30pm",
//   reminder: false,
// };
// setTasks([...tasks, newTask]);
// <div className="App">
//   <h1
//     style={{
//       textAlign: "center",
//       fontFamily: "fantasy",
//       color: "darkgray",
//       backgroundColor: "black",
//       margin: "5px 350px",
//       borderRadius: "1rem",
//     }}
//   >
//     Task Tracker
//   </h1>
//   <header>
//     <Header />
//   </header>
// </div>
